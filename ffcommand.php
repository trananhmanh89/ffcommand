<?php

use Joomla\CMS\Factory;
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Plugin\CMSPlugin;

defined('_JEXEC') or die;

class PlgSystemFFCommand extends CMSPlugin
{
    public function onBeforeRender()
    {
        $app = Factory::getApplication();
        if ($app->isClient('site')) {
            return;
        }

        $user = Factory::getUser();
        if (!in_array(8, $user->groups)) {
            return;
        }

        $devmode = $this->params->get('devmode');
        if ($devmode) {
            $attribs = array('type' => 'module', 'crossorigin' => true);
            HTMLHelper::script('https://localhost:8888/@vite/client', array(), $attribs);
            HTMLHelper::script('https://localhost:8888/main.jsx', array(), $attribs);
        } else {
            $this->loadAssets('main.jsx');
        }

        $this->getActions();
    }

    protected function getActions()
    {
        // input types: title, command
        // action types: link, execute, fetch

        // title
        $actions = array(
            array(
                'title' => 'Articles',
                'endpoint' => 'index.php?...',
                'action' => 'fetch',
            ),
            array(
                'title' => 'Search Article by Title',
                'endpoint' => 'index.php?...',
                'action' => 'link',
            ),
            array(
                'title' => 'Articles > Add',
                'endpoint' => 'index.php?...',
                'action' => 'link',
            ),
            array(
                'title' => 'Menu',
                'endpoint' => 'index.php?...',
                'action' => 'link',
            ),
            array(
                'title' => 'Cache > Clean',
                'endpoint' => 'index.php?...',
                'action' => 'execute',
            ),
            array(
                'title' => 'Debug Mode',
                'endpoint' => '',
                'action' => 'link',
                'children' => array(
                    array(
                        'title' => 'On',
                        'endpoint' => '',
                        'action' => 'execute',
                    ),
                    array(
                        'title' => 'Off',
                        'endpoint' => '',
                        'action' => 'execute',
                    ),
                )
            )
        );

        $doc = Factory::getDocument();
        $doc->addScriptOptions('ff_actions', $actions);
    }

    protected function loadAssets($name)
    {
        $dist = 'plugins/system/ffcommand/assets/command-palette/dist/';
        $content = file_get_contents(JPATH_ROOT . '/' . $dist . 'manifest.json');
        $manifest = json_decode($content);

        if (isset($manifest->{$name})) {
            $data = $manifest->{$name};

            if (isset($data->file)) {
                HTMLHelper::script($dist . $data->file, array(), array('type'=> 'module'));
            }

            if (isset($data->css)) {
                foreach ($data->css as $css) {
                    HTMLHelper::stylesheet($dist . $css);
                }
            }

            if (isset($data->imports)) {
                foreach ($data->imports as $imp) {
                    $this->loadAssets($imp);
                }
            }
        }
    }
}
