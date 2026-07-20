<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// ─── Auth Routes (public) ────────────────────────────────────────────────────
Route::prefix('auth')->group(function () {
    Route::post('register', [\App\Http\Controllers\Api\AuthController::class, 'register']);
    Route::post('login',    [\App\Http\Controllers\Api\AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('logout', [\App\Http\Controllers\Api\AuthController::class, 'logout']);
        Route::get('user',    [\App\Http\Controllers\Api\AuthController::class, 'user']);
    });
});

// ─── Protected API Routes ─────────────────────────────────────────────────────
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('posts', \App\Http\Controllers\Api\PostController::class);
});

// ─── Public Routes ────────────────────────────────────────────────────────────
Route::get('categories', [\App\Http\Controllers\Api\CategoryController::class, 'index'])
    ->name('categories.index');
