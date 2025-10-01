<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CarController extends Controller
{
    /**
     * Affiche toutes les voitures
     */
    public function index(): JsonResponse
    {
        try {
            $cars = Car::all();
            return response()->json($cars, 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erreur lors de la récupération des voitures',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Affiche une voiture par son ID
     */
    public function show($id): JsonResponse
    {
        try {
            $car = Car::findOrFail($id);
            return response()->json($car, 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Voiture non trouvée'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erreur serveur',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Ajoute une nouvelle voiture
     */
    public function store(Request $request): JsonResponse
    {
        try {
            // Validation des données
            $validated = $request->validate([
                'model' => 'required|string|max:255',
                'year' => 'required|integer|min:1990|max:' . (date('Y') + 1),
                'km' => 'required|integer|min:0',
                'price' => 'required|numeric|min:0',
                'image' => 'nullable|string'
            ]);

            $car = Car::create($validated);
            return response()->json($car, 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'error' => 'Données invalides',
                'messages' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erreur lors de la création',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Met à jour une voiture
     */
    public function update(Request $request, $id): JsonResponse
    {
        try {
            $car = Car::findOrFail($id);
            
            $validated = $request->validate([
                'model' => 'sometimes|string|max:255',
                'year' => 'sometimes|integer|min:1990|max:' . (date('Y') + 1),
                'km' => 'sometimes|integer|min:0',
                'price' => 'sometimes|numeric|min:0',
                'image' => 'nullable|string'
            ]);

            $car->update($validated);
            return response()->json($car, 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Voiture non trouvée'
            ], 404);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'error' => 'Données invalides',
                'messages' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erreur lors de la mise à jour',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Supprime une voiture
     */
    public function destroy($id): JsonResponse
    {
        try {
            $car = Car::findOrFail($id);
            $car->delete();
            
            return response()->json([
                'message' => 'Voiture supprimée avec succès'
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Voiture non trouvée'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erreur lors de la suppression',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
