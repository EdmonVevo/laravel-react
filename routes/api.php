<?php


//Route::post('/login', 'AuthController@login');


Route::get('/', function () {
    return view('welcome');
});




Route::group([
], function () {
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');

});


Route::group([
    'middleware' => ['before' => 'jwt.auth']
], function () {
    Route::get('companies', 'CompanyController@index');
    Route::post('companies', 'CompanyController@store');
    Route::get('companies/{id}', 'CompanyController@edit');
    Route::put('companies/{id}', 'CompanyController@update');
    Route::delete('companies/{id}', 'CompanyController@destroy');

    Route::get('employees', 'EmployerController@index');
    Route::post('employees', 'EmployerController@store');
    Route::get('employees/{id}', 'EmployerController@edit');
    Route::put('employees/{id}', 'EmployerController@update');
    Route::delete('employees/{id}', 'EmployerController@destroy');

});

