<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Todo;

class TodoController extends Controller
{
    
    public function all()
    {
        $todos = Todo::all();
        return response()->json($todos);
    }


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'title' => 'required|string',
            'description' => 'required|string',
            'deadline' => 'required|date|after:today|date_format:Y-m-d'
        ]);
        if($validator->fails()){

            return response()->json($validator->errors(),422);
            
        }else{

            $todo = Todo::create($request->all());
            return response()->json($todo, 201);
        }
    }

    
    public function show(string $id)
    {
        $todo = Todo::find($id);
        return response()->json($todo);
    }

    
    public function update(Request $request, string $id)
    {
        $todo = Todo::find($id);
        $todo->update($request->all());
        return response()->json($todo);
    }


    public function delete(string $id)
    {
        $todo = Todo::find($id);
        $todo->delete();
        return response()->json(null, 204);
    }
}
