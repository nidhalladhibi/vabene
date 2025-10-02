<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run()
    {
        // Supprime l'ancien admin s'il existe
        User::where('email', 'admin@autovista.com')->delete();

        User::create([
            'name' => 'Admin AutoVista',
            'email' => 'admin@autovista.com',
            'password' => Hash::make('Admin@2025!'), // ✅ Mot de passe sécurisé
            'is_admin' => true, // ✅ Changé de 'role' à 'is_admin'
        ]);
    }
}