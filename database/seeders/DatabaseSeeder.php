<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Customer;
use App\Models\Gas;
use App\Models\Supplier;
use App\Models\Supply;
use App\Models\Transaction;
use App\Models\Tube;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);


        User::create([
            'name' => 'Ezra Abednego',
            'username' => 'ezra',
            'password' => bcrypt('asd'),
        ]);

        Customer::factory(500)->create();
        Supplier::factory(500)->create();
        
        // Gas::factory(100)->create();
        Gas::create([
            'name' => 'Oksigen 6m³',
            'capital_price' => 80000,
            'selling_price' => 90000,
        ]);
        Gas::create([
            'name' => 'Oksigen 1m³',
            'capital_price' => 25000,
            'selling_price' => 35000,
        ]);
        Gas::create([
            'name' => 'Nitrogen 6m³',
            'capital_price' => 190000,
            'selling_price' => 200000,
        ]);
        Gas::create([
            'name' => 'Nitrogen 1m³',
            'capital_price' => 90000,
            'selling_price' => 100000,
        ]);
        Gas::create([
            'name' => 'CO2 25kg',
            'capital_price' => 240000,
            'selling_price' => 250000,
        ]);
        Gas::create([
            'name' => 'CO2 5kg',
            'capital_price' => 120000,
            'selling_price' => 130000,
        ]);
        Gas::create([
            'name' => 'CO2 3kg',
            'capital_price' => 90000,
            'selling_price' => 100000,
        ]);
        Gas::create([
            'name' => 'Argon 6m³',
            'capital_price' => 290000,
            'selling_price' => 300000,
        ]);
        Gas::create([
            'name' => 'Argon 1m³',
            'capital_price' => 90000,
            'selling_price' => 100000,
        ]);
        Gas::create([
            'name' => 'C2H2 3kg',
            'capital_price' => 390000,
            'selling_price' => 400000,
        ]);



        
        Tube::factory(20)->create();
        Transaction::factory(500)->create();
        Supply::factory(500)->create();
    }
}