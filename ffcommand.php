<?php

use Joomla\CMS\Factory;
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Plugin\CMSPlugin;
use Joomla\Registry\Registry;

defined('_JEXEC') or die;

class PlgSystemFFCommand extends CMSPlugin
{
    public function onBeforeRender()
    {
        $app = Factory::getApplication();
        if ($app->isClient('site')) {
            return;
        }

        $devmode = $this->params->get('devmode');
        if ($devmode) {
            $attribs = array('type' => 'module', 'crossorigin' => true);
            HTMLHelper::script('https://localhost:3000/main.js', array(), $attribs);
        } else {
            $this->loadAssets('main.js');
        }
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
