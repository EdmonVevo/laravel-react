<?php

namespace App\Http\Controllers;

use App\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $company = Company::orderBy('id','desc')->paginate(10);
        return response()->json($company);

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {

        $validatedData = $request->validate([
            'name' => 'required',
            'email' => 'required',
            'website' => 'required',
            'logo'=>'required'
        ]);
        if ($validatedData){
            $file_data = $request->get('logo');  // your base64 encoded
            $file_name = 'image_'.time().'.png'; //generating unique file name;
            @list($type, $file_data) = explode(';', $file_data);
            @list(, $file_data) = explode(',', $file_data);
            if($file_data!=""){ // storing image in storage/app/public Folder
                Storage::disk('public_uploads')->put($file_name,base64_decode($file_data));
            }

            $company = new Company();
            $company->name = $request->get('name');
            $company->email = $request->get('email');
            $company->website = $request->get('website');
            $company->logo = $file_name;
           if ($company->save()){
               return response()->json(200);
           }
        }
        else {
            return response()->json(404);
        }
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $company = Company::find($id);
        return $company;
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        $validatedData = $request->validate([
            'name' => 'required',
            'email' => 'required',
            'website' => 'required',
            'logo'=>'required'
        ]);

        if ($validatedData){
            $file_data = $request->get('logo');  // your base64 encoded
            $file_name = 'image_'.time().'.png'; //generating unique file name;
            @list($type, $file_data) = explode(';', $file_data);
            @list(, $file_data) = explode(',', $file_data);
            if($file_data!=""){ // storing image in storage/app/public Folder
                Storage::disk('public_uploads')->put($file_name,base64_decode($file_data));
            }
            $company = Company::find($id);
            $company->name = $request->get('name');
            $company->email = $request->get('email');
            $company->website = $request->get('website');
            $company->logo = $file_name;
            if ($company->save()){
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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $company =Company::find($id);
        if($company->destroy($id)) {
            $image = $company->logo;
            $filename = public_path().'/images/'.$image;
            \File::delete($filename);
        }
    }
}
