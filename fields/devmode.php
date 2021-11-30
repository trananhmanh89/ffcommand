<?php

use Joomla\CMS\Form\Field\ListField;
use Joomla\CMS\HTML\HTMLHelper;

defined('_JEXEC') or die('Restricted access');

class JFormFieldDevmode extends ListField
{
    protected function getLayoutData()
    {
        HTMLHelper::_('jquery.framework');
        HTMLHelper::script('plugins/system/command/assets/devmode.js');
        return parent::getLayoutData();
    }
}
