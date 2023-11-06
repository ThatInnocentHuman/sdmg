<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tube;
use App\Http\Requests\StoreTubeRequest;
use App\Http\Requests\UpdateTubeRequest;
use App\Http\Resources\TubeResource;
use Illuminate\Support\Facades\DB;

class TubeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return TubeResource::collection(
            Tube::select('tubes.*', 'gases.name as name')
                ->join('gases', 'tubes.gas_id', '=', 'gases.id')
                ->orderBy('updated_at', 'desc')
                ->paginate(20)
            // Tube::query()->orderBy('updated_at', 'desc')->paginate(20)
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTubeRequest $request)
    {
        $data = $request->validated();
        $tube = Tube::create($data);
        return response(new TubeResource($tube), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Tube $tube)
    {
        return new TubeResource($tube);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTubeRequest $request, Tube $tube)
    {
        $data = $request->validated();
        $tube->update($data);
        return response(new TubeResource($tube), 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tube $tube)
    {
        $tube->delete();
        return response("", 204);
    }

    public function getStock() {
        return TubeResource::collection(
            Tube::select('tubes.id', DB::raw("CASE WHEN gas_id IS NULL THEN 'kosong' ELSE gas_id END as gas_id", 'gas.id'), 'gases.name')
                ->leftJoin('gases', 'tubes.gas_id', '=', 'gases.id')
                ->orderByRaw('ISNULL(gas_id) DESC')
                ->orderBy('tubes.updated_at', 'DESC')
                ->get()
        );
        
    }
}