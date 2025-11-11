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
            0 => 0,
            1 => 1,
            2 => 2,
            3 => 3,
        ],
        'Medium' => [
            0 => 0,
            1 => 2,
            2 => 4,
            3 => 5,
        ],
        'High' => [
            0 => 0,
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


    'INSURANCE_BRACKETS' => [
        'Basic'     => 27,
        'Standard'  => 36,
        'Enhanced'  => 45,
        'Premium'   => 72,
    ],

    'BONUS_BRACKETS' => [
        'Not Eligible'        => 27,   // < 27
        'Basic Bonus'         => 27,   // > 27
        'Performance Based'   => 48,
        'Executive Bonus'     => 75,
    ],

    'DAYSOFF_BRACKETS' => [
        'Not Eligible' => 66,  // < 66
        '1 Day'        => 66,  // > 66
        '2 Days'       => 72,
        '3 Days'       => 81,
    ],

    'DESIGNATIONS' => [
        81 => ['main' => 'Chief',        'sub' => 'C1', 'grade' => '1'],
        78 => ['main' => 'Chief',        'sub' => 'C2', 'grade' => '2'],
        75 => ['main' => 'Chief',        'sub' => 'C3', 'grade' => '3'],

        72 => ['main' => 'GM',           'sub' => 'G1', 'grade' => '4'],
        69 => ['main' => 'GM',           'sub' => 'G2', 'grade' => '5'],
        66 => ['main' => 'GM',           'sub' => 'G3', 'grade' => '6'],

        63 => ['main' => 'Director',     'sub' => 'D1', 'grade' => '7'],
        60 => ['main' => 'Director',     'sub' => 'D2', 'grade' => '8'],
        57 => ['main' => 'Director',     'sub' => 'D3', 'grade' => '9'],

        54 => ['main' => 'Head',         'sub' => 'H1', 'grade' => '10'],
        51 => ['main' => 'Head',         'sub' => 'H2', 'grade' => '11'],
        48 => ['main' => 'Head',         'sub' => 'H3', 'grade' => '12'],

        45 => ['main' => 'Manager',      'sub' => 'M1', 'grade' => '13'],
        42 => ['main' => 'Manager',      'sub' => 'M2', 'grade' => '14'],
        39 => ['main' => 'Manager',      'sub' => 'M3', 'grade' => '15'],

        36 => ['main' => 'Team Leader',  'sub' => 'T1', 'grade' => '16'],
        33 => ['main' => 'Team Leader',  'sub' => 'T2', 'grade' => '17'],
        30 => ['main' => 'Team Leader',  'sub' => 'T3', 'grade' => '18'],

        27 => ['main' => 'Specialist',   'sub' => 'S1', 'grade' => '19'],
        24 => ['main' => 'Specialist',   'sub' => 'S2', 'grade' => '20'],
        21 => ['main' => 'Specialist',   'sub' => 'S3', 'grade' => '21'],

        18 => ['main' => 'Junior',       'sub' => 'J1', 'grade' => '22'],
        15 => ['main' => 'Junior',       'sub' => 'J2', 'grade' => '23'],
        12 => ['main' => 'Junior',       'sub' => 'J3', 'grade' => '24'],

        9  => ['main' => 'Foreman',      'sub' => null, 'grade' => '25'],
        6  => ['main' => 'Worker',       'sub' => null, 'grade' => '26'],
        3  => ['main' => 'Labour',       'sub' => null, 'grade' => '27'],
    ],



];
