<?php

namespace App\Http\Controllers;

use App\Employer;
use Illuminate\Http\Request;

class EmployerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $employer = Employer::orderBy('id','desc')->paginate(8);
        return response()->json($employer);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'firstname' => 'required',
            'lastname' => 'required',
            'company' => 'required',
            'email' => 'required',
            'phone' => 'required',
        ]);

        if ($validatedData){
            $employer = new Employer();
            $employer->firstname = $request['firstname'];
            $employer->lastname = $request['lastname'];
            $employer->company = $request['company'];
            $employer->email = $request['email'];
            $employer->phone = $request['phone'];


            if ($employer->save()) {
                $answer = 'Employer is saved';
                return response()->json($answer);
            }
            else {
                $answer = 'Employer is not saved';
                return response()->json($answer);
            }
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $employer = Employer::find($id);
        return $employer;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        $validatedData = $request->validate([
            'firstname' => 'required',
            'lastname' => 'required',
            'company' => 'required',
            'email' => 'required',
            'phone' => 'required',
        ]);

        if ($validatedData){
            $employer = Employer::find($id);
            $employer->firstname = $request['firstname'];
            $employer->lastname = $request['lastname'];
            $employer->company = $request['company'];
            $employer->email = $request['email'];
            $employer->phone = $request['phone'];
            if ($employer->save()){
                return response()->json(200);
            }
        }
        else {
            return response()->json(404);
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $employer=Employer::find($id);
        $employer->destroy($id);

    }
}
