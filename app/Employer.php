<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Employer extends Model
{
    protected $table = 'employees';
    protected $fillable = [
        'firstname',
        'lastname',
        'company',
        'email',
        'phone'
    ];
}
