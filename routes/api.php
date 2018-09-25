<?php


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
    Route::get('companies', 'Api\CompanyController@index');
    Route::post('companies', 'Api\CompanyController@store');
    Route::get('companies/{id}', 'Api\CompanyController@edit');
    Route::put('companies/{id}', 'Api\CompanyController@update');
    Route::delete('companies/{id}', 'Api\CompanyController@destroy');

    Route::get('employees', 'Api\EmployerController@index');
    Route::post('employees', 'Api\EmployerController@store');
    Route::get('employees/{id}', 'Api\EmployerController@edit');
    Route::put('employees/{id}', 'Api\EmployerController@update');
    Route::delete('employees/{id}', 'Api\EmployerController@destroy');

});

