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
    Route::post('companies/store', 'CompanyController@store');
    Route::get('companies/edit/{id}', 'CompanyController@edit');
    Route::put('companies/update/{id}', 'CompanyController@update');
    Route::delete('companies/delete/{id}', 'CompanyController@destroy');

    Route::get('employees', 'EmployerController@index');
    Route::post('employees/store', 'EmployerController@store');
    Route::get('employees/edit/{id}', 'EmployerController@edit');
    Route::put('employees/update/{id}', 'EmployerController@update');
    Route::delete('employees/delete/{id}', 'EmployerController@destroy');

});

