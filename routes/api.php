<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource("posts",\App\Http\Controllers\Api\PostController::class);

Route::get("categories",[\App\Http\Controllers\Api\CategoryController::class,'index'])->name("categories.index");
