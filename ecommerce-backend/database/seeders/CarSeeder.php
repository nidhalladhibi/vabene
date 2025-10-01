<?php

namespace Database\Seeders;

use App\Models\Car;
use Illuminate\Database\Seeder;

class CarSeeder extends Seeder
{
    public function run(): void
    {
        Car::create([
            'model' => 'BMW Serie 3',
            'year' => 2020,
            'km' => 45000,
            'price' => 35000.00,
            'image' => 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400'
        ]);

        Car::create([
            'model' => 'Mercedes Class C',
            'year' => 2019,
            'km' => 62000,
            'price' => 32000.00,
            'image' => 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400'
        ]);

        Car::create([
            'model' => 'Audi A4',
            'year' => 2021,
            'km' => 35000,
            'price' => 38000.00,
            'image' => 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400'
        ]);

        // Car::create([
        //     'model' => 'Volkswagen Golf',
        //     'year' => 2022,
        //     'km' => 15000,
        //     'price' => 25000.00,
        //     'image' => 'https://images.unsplash.com/photo-1622353219448-46a009f0d44f?w=400'
        // ]);

        // Car::create([
        //     'model' => 'Peugeot 308',
        //     'year' => 2021,
        //     'km' => 28000,
        //     'price' => 22000.00,
        //     'image' => 'https://images.unsplash.com/photo-1552519507-df485f97c4dd?w=400'
        // ]);

        Car::create([
            'model' => 'Renault Clio',
            'year' => 2020,
            'km' => 42000,
            'price' => 16000.00,
            'image' => 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400'
        ]);

        Car::create([
            'model' => 'Toyota Corolla',
            'year' => 2021,
            'km' => 32000,
            'price' => 24000.00,
            'image' => 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=400'
        ]);

        Car::create([
            'model' => 'Nissan Qashqai',
            'year' => 2022,
            'km' => 18000,
            'price' => 28000.00,
            'image' => 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400'
        ]);

        Car::create([
            'model' => 'Hyundai Tucson',
            'year' => 2021,
            'km' => 25000,
            'price' => 27000.00,
            'image' => 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=400'
        ]);

        Car::create([
            'model' => 'Tesla Model 3',
            'year' => 2022,
            'km' => 8000,
            'price' => 48000.00,
            'image' => 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400'
        ]);

  

        Car::create([
            'model' => 'MG GT Rouge',
            'year' => 2025,
            'km' => 0,
            'price' => 32000.00,
            'image' => 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400'
        ]);
    }
}