<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

Route::get('/hello', function () {
    return response()->json(['message' => 'Hello depuis Laravel 🚀']);
});

// Use ProductController for products route
Route::get('/products', [ProductController::class, 'index']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});