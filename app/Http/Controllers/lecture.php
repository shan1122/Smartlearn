<?php

namespace App\Http\Controllers;
use App\lecture as LectureModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Topics;
use App\Books;
use App\Research_paper;
class lecture extends Controller
{
    public function lectures(){
        return LectureModel::all();
    }
    public function lecturesOfSpecificCourse($id){
         $lectures = DB::table("lectures")
                    ->join('topics',"lectures.topic_id",'=',"topics.topic_id")
                    ->join('course','topics.course_id','=','course.course_id')
                    ->where('course.course_id',$id)
                    ->select('lectures.*')->get();
        echo $lectures;
    }
    public function books($id){
        $books = Books::find($id);
        if(isset($books))
        return $books->get();
        return [];
    }
    public function papers($id){
        $books = Research_paper::find($id);
        if(isset($books))
        return $books->get();
        return [];
    }
}
