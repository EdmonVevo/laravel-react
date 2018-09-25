<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\File;
use App\Company;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCompany;
use Illuminate\Support\Facades\Storage;

class CompaniesController extends Controller
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
    public function store(StoreCompany $request)
    {
        $request->validated();

        $file_data = $request->get('logo');
        $file_name = 'image_'.time().'.png';
        @list($type, $file_data) = explode(';', $file_data);
        @list(, $file_data) = explode(',', $file_data);
        if($file_data!=""){
            Storage::disk('public_uploads')->put($file_name,base64_decode($file_data));
        }

        $company = new Company();
        $company->name = $request->get('name');
        $company->email = $request->get('email');
        $company->website = $request->get('website');
        $company->logo = $file_name;
       if ($company->save()){
           return response()->json("Company is created");
       }
       return response()->json("Something went wrong");
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
    public function update(StoreCompany $request, $id)
    {
        $request->validated();

        $file_data = $request->get('logo');
        $file_name = 'image_'.time().'.png';
        @list($type, $file_data) = explode(';', $file_data);
        @list(, $file_data) = explode(',', $file_data);
        if($file_data!=""){
            Storage::disk('public_uploads')->put($file_name,base64_decode($file_data));
        }
        $company = Company::find($id);
        $company->name = $request->get('name');
        $company->email = $request->get('email');
        $company->website = $request->get('website');
        $company->logo = $file_name;
        if ($company->save()){
            return response()->json("Company is updated");
        }
        return response()->json("Something went wrong");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $company = Company::find($id);
        if($company->destroy($id)) {
            $image = $company->logo;
            $filename = public_path('images/').$image;
            File::delete($filename);
        }
    }
}
