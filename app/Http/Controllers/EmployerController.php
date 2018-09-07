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
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $employer = new Employer();
        $employer->firstname = $request['firstname'];
        $employer->lastname = $request['lastname'];
        $employer->company = $request['company'];
        $employer->email = $request['email'];
        $employer->phone = $request['phone'];
        $employer->save();
        $answer = 'Employer is saved';
        return response()->json($answer);

    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
        $employer = Employer::find($id);
        $employer->firstname = $request['firstname'];
        $employer->lastname = $request['lastname'];
        $employer->company = $request['company'];
        $employer->email = $request['email'];
        $employer->phone = $request['phone'];
        $employer->save();
        $answer = 'Employer is saved';
        return response()->json($answer);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $employer=new Employer();
        $employer->destroy($id);
        $answer='Employer is removed';
        return response()->json($answer);
    }
}
