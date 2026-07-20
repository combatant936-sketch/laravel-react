<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/', function () {
    return view('layouts.app');
});
Route::get('/{any?}', function () {
    return view('layouts.app');
})->where('any', '.*');

