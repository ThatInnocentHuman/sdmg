<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CustomerController;
use App\Http\Controllers\Api\GasController;
use App\Http\Controllers\Api\SupplierController;
use App\Http\Controllers\Api\SupplyController;
use App\Http\Controllers\Api\TransactionController;
use App\Http\Controllers\Api\TubeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function(){
    Route::post('/logout', [AuthController::class, 'logout']); 
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    route::get('/gas/stock', [GasController::class, 'getStock']);
    route::get('/tube/stock', [TubeController::class, 'getStock']);

    Route::apiResource('/customer', CustomerController::class);
    Route::apiResource('/supplier', SupplierController::class);
    Route::apiResource('/tube', TubeController::class);
    Route::apiResource('/gas', GasController::class);
    Route::apiResource('/transaction', TransactionController::class);
    Route::apiResource('/supply', SupplyController::class);
    
});

route::post('/signup', [AuthController::class, 'signup']);
route::post('/login', [AuthController::class, 'login']);