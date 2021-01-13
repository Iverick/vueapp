<?php

use Illuminate\Database\Seeder;

class ListingsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Extract data from the local data.json file
        $path = base_path() . '/database/data.json';
        $file = File::get($path);
        $data = json_decode($file, true);
        // Inserting data into a database
        DB::table('listings')->insert($data);
    }
}
