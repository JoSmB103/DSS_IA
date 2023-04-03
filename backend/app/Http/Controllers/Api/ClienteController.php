<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cliente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ClienteController extends Controller
{
    private function validations()
    {
        return [
            'nombre' => ['required', 'string', 'max:150'],
            'apellidos' => ['required', 'string', 'max:150'],
            'edad' => ['required', 'int', 'min:1'],
            'sueldo' => ['required', 'regex:/^[0-9]{1,8}[.]?[0-9]{1,2}$/'],
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $clientes = Cliente::all();
        return response()->json([
            'ok' => true,
            'clientes' => $clientes,
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $validator = Validator::make($data, $this->validations());
        if ($validator->fails()) {
            return response()->json([
                'errores' => $validator->errors(),
            ], 400);
        }
        $cliente = Cliente::create($data);
        $cliente->save();
        return response()->json([
            'ok' => true,
            'mensaje' => '¡Cliente creado exitósamente!',
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $cliente = Cliente::find($id);
        return response()->json([
            'ok' => true,
            'cliente' => $cliente,
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = $request->all();
        $cliente = Cliente::find($id);
        $validator = Validator::make($data, $this->validations());
        if ($validator->fails()) {
            return response()->json([
                'errores' => $validator->errors(),
            ], 400);
        }
        $cliente->update($data);
        return response()->json([
            'ok' => true,
            'mensaje' => '¡Cliente actualizado exitósamente!',
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $cliente = Cliente::find($id);
        $cliente->delete();
        return response()->json([
            'ok' => true,
            'mensaje' => '¡Cliente eliminado exitósamente!',
        ], 200);
    }
}
