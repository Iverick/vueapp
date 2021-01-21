<?php

use Illuminate\Database\Seeder;
use App\User;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Seeds User database with a user.
     *
     * @return void
     */
    public function run()
    {
        $user1 = User::create([
            'name'     => 'Esco',
            'email'    => 'test@gmail.com', 
            'password' => Hash::make('test'), 
            'saved'    => [1,7,13]
        ]);
        
        DB::table('users')->insert($user1);
    }
}
