<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Supply;
use App\Http\Requests\StoreSupplyRequest;
use App\Http\Requests\UpdateSupplyRequest;
use App\Http\Resources\SupplyResource;

class SupplyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return SupplyResource::collection(Supply::query()->paginate(20));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSupplyRequest $request)
    {
        $data = $request->validated();
        $supply = Supply::create($data);
        return response(new SupplyResource($supply), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Supply $supply)
    {
        return new SupplyResource($supply);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSupplyRequest $request, Supply $supply)
    {
        $data = $request->validated();
        $supply->update($data);
        return response(new SupplyResource($supply), 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Supply $supply)
    {
        $supply->delete();
        return response("", 201);
    }
}