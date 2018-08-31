<?php

use SilverStripe\Forms\DropdownField;
use SilverStripe\Forms\GridField\GridField;
use SilverStripe\Forms\GridField\GridFieldConfig_RecordEditor;

class CoursePage extends Page {
	
	private static $description = 'Page outlining a course and displaying associated audio objects.';
	private static $icon = 'site/cms/icons/course.png';

    private static $db = [
    ];

    private static $has_one = [
        'Teacher' => 'TeacherPage'
    ];

    // private static $has_many = [
    //     'Audios' => 'Audio'
    // ];

    private static $allowed_children = [
        'AudioPage'
    ];

    public function getCMSFields(){
	
        $fields = parent::getCMSFields();		
        $fields->addFieldToTab(
        	'Root.Main',
        	DropdownField::create(
	            'TeacherID',
                'Teacher',
	            TeacherPage::get()->map()
	        )->setEmptyString('(Select a teacher)'),
            'Content'
        );		
        return $fields;		
    }
}