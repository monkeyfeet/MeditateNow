<?php

use SilverStripe\Forms\TextareaField;
use SilverStripe\AssetAdmin\Forms\UploadField;
use SilverStripe\Assets\File;

class AudioPage extends Page {
	
	private static $description = 'Page featuring an audio file.';
	private static $icon = 'site/cms/icons/audio.png';

    private static $db = [
        'Intro' => 'Text'
    ];

    private static $has_one = [
        'AudioFile' => File::class
    ];

    private static $allowed_children = [];

    public function getCMSFields(){
	
        $fields = parent::getCMSFields();		
        $fields->addFieldToTab(
        	'Root.Main',
        	TextareaField::create(
	            'Intro',
	            'Intro'
	        )->setDescription('Introductory text to display on landing (course) page.'),
            'Content'
        );
        $fields->addFieldToTab(
            'Root.Main',
            UploadField::create(
                'AudioFile',
                'Audio file'
            )->setFolderName('Audio'),
            'Content'
        );		
        return $fields;		
    }
}