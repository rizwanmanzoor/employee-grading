<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $employees = [
            [
                'id' => 1072,
                'name' => 'ABDUL RAHMAN MAZEN GHAZAL',
                'email' => 'a.ghazal@creativehouseksa.com',
                'designation' => 'PROJECTS MANAGER',
            ],
            [
                'id' => 1060,
                'name' => 'ABDUL RAHMAN MUHAMMAD',
                'email' => null,
                'designation' => 'Carpenter',
            ],
            [
                'id' => 1159,
                'name' => 'ABDUL RAKIB EIZ EDDIN ALBUNI',
                'email' => 'a.albuni@creativehouseksa.com',
                'designation' => 'KEY ACCOUNT MANAGER',
            ],
            [
                'id' => 1070,
                'name' => 'ABDULAZIZ ADAM',
                'email' => 'a.adam@noxksa.com',
                'designation' => 'SENIOR OPERATIONS MANAGER',
            ],
            [
                'id' => 1053,
                'name' => 'ABDULAZIZ ALSHABEBI',
                'email' => 'a.alshabebi@noxksa.com',
                'designation' => 'INTERNAL AUDITOR',
            ],
            [
                'id' => 1105,
                'name' => 'ABDULLAH DHEFULLAH NASSER ALOTAIBI',
                'email' => 'A.Alotaibi@noxksa.com',
                'designation' => 'HUMAN RESOURCES DIRECTOR',
            ],
            // ... (continue adding all records the same way)
        ];

        DB::table('employees')->insert($employees);
    }
}
