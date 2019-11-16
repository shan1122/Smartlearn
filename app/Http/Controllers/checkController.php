<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Check;
class checkController extends Controller
{
    public function index(Request $request)
    {


        $check =new Check;

        $check->name=$request->input('check');
        $check->save();


    }
    public function second()
    {
        return view('check');
    }
    public function  Login(){
        return view('LoginPage');


    }
}
