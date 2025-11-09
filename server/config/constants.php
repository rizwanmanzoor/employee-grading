<?php

return [

    // Max Marks with Weightage (converted to decimal)
    'WEIGHTAGE' => [
        'Education'             => 0.20, // 20%
        'Certificate'           => 0.20, // 20%
        'External experience'   => 0.20, // 20%
        'English'               => 0.15, // 15%
        'Management experience' => 0.25, // 25%
    ],

    // Verification / Relevancy Percentages
    'PERCENTAGE' => [
        'Verified'   => 1.00,   // 100%
        'Unverified' => 0.25,   // 25%
        'Relevant'   => 1.00,   // 100%
        'Irrelevant' => 0.20,   // 20%
    ],

    'EDUCATION_GRADES' => [
        'Basics'    => 1,
        'Diploma'   => 3,
        'Bachelors' => 6,
        'Masters'   => 9,
        'Phd'      => 10,
    ],

    'CERTIFICATE_GRADES' => [
        'Low' => [
            1 => 1,
            2 => 2,
            3 => 3,
        ],
        'Medium' => [
            1 => 2,
            2 => 4,
            3 => 5,
        ],
        'High' => [
            1 => 15,
            2 => 20,
        ],
    ],

    'EXTERNAL_EXPERIENCE_GRADES' => [
        0  => 0,
        1  => 0.5,
        2  => 1,
        3  => 1.5,
        4  => 2,
        5  => 2.5,
        6  => 3,
        7  => 3.5,
        8  => 4,
        9  => 4.5,
        10 => 5,
        11 => 5.5,
        12 => 6,
        13 => 6.5,
        14 => 7,
        15 => 7.5,
        16 => 8,
        17 => 8.5,
        18 => 9,
        19 => 9.5,
        20 => 10,
        21 => 10.5,
        22 => 11,
        23 => 11.5,
        24 => 12,
        25 => 12.5,
        26 => 13,
        27 => 13.5,
        28 => 14,
        29 => 14.5,
        30 => 15,
    ],

    'MANAGEMENT_EXPERIENCE_GRADES' => [
        0  => 0,
        1  => 1.34,
        2  => 2.68,
        3  => 4.02,
        4  => 5.36,
        5  => 6.7,
        6  => 8.04,
        7  => 9.38,
        8  => 10.72,
        9  => 12.06,
        10 => 13.4,
        11 => 14.74,
        12 => 16.08,
        13 => 17.42,
        14 => 18.76,
        15 => 20,
    ],

    'ENGLISH_GRADES' => [
        'None'      => 0,
        'Basic'     => 5,
        'Average'   => 9,
        'Good'      => 12,
        'Excellent' => 15,
    ],




];
