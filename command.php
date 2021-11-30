<?php

use Joomla\CMS\Factory;
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Plugin\CMSPlugin;

defined('_JEXEC') or die;

class PlgSystemCommand extends CMSPlugin
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

        }
    }
}
