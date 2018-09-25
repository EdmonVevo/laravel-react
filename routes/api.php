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
    Route::get('companies', 'Api\CompaniesController@index');
    Route::post('companies', 'Api\CompaniesController@store');
    Route::get('companies/{id}', 'Api\CompaniesController@edit');
    Route::put('companies/{id}', 'Api\CompaniesController@update');
    Route::delete('companies/{id}', 'Api\CompaniesController@destroy');

    Route::get('employees', 'Api\EmployeesController@index');
    Route::post('employees', 'Api\EmployeesController@store');
    Route::get('employees/{id}', 'Api\EmployeesController@edit');
    Route::put('employees/{id}', 'Api\EmployeesController@update');
    Route::delete('employees/{id}', 'Api\EmployeesController@destroy');

});

