<?php

use SilverStripe\Forms\DropdownField;
use SilverStripe\Forms\GridField\GridField;
use SilverStripe\Forms\GridField\GridFieldConfig_RecordEditor;

class TeacherPage extends Page {
	
	private static $description = 'Page displaying a teacher\'s description and available courses.';
	private static $icon = 'site/cms/icons/teacher.png';

    private static $db = [
    ];

    private static $has_one = [
    ];

    private static $has_many = [
        'Courses' => 'CoursePage'
    ];

    private static $allowed_children = [
        'CoursePage'
    ];

    public function getCMSFields(){
	
        $fields = parent::getCMSFields();	
        return $fields;		
    }
}