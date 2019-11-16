<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Course as MyCourseModel;
class course extends Controller
{
    public function getCourses(){
        $allCourses = MyCourseModel::all();
        return response()->json($allCourses);
    }
}
