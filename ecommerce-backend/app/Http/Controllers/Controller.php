<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        // مؤقتاً نرجعو بيانات ثابتة
        return response()->json([
            ['id' => 1, 'name' => 'Laptop', 'price' => 1200],
            ['id' => 2, 'name' => 'Phone', 'price' => 800],
            ['id' => 3, 'name' => 'Headphones', 'price' => 150],
        ]);
    }
}
