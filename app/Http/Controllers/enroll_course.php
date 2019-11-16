<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\EnrollCourse as EnrollCourse;
use App\Course;
use App\User_Progress;
use App\Topics;
class enroll_course extends Controller
{
    //
    public function getCurrentUser(){
        return Auth::guard()->user();
    }   
    public function enrollCourse($id){
        $id_of_user =$this->getCurrentUser()->id;
        $if_already_enrolled = EnrollCourse::where('user_id',$id_of_user)->where('course_id',$id)->get();
        if(sizeof($if_already_enrolled) > 0)
        return response()->json(['Already Registered Duplicate Entry'],409);
        $enrolling_user = new  EnrollCourse();
        $enrolling_user->user_id = $id_of_user;
        $enrolling_user->course_id = $id;
        $enrolling_user->save();
        $user_progress = new User_Progress();
        $user_progress->course_id = $id;
        $user_progress->user_id = $id_of_user;
        $user_progress->topic_id = Topics::where("course_id",$id)->first()->topic_id;
        $user_progress->save(); 
        return response()->json(["Course Enrolled Successfully"],200);
    }
    public function getEnrolledCourses(){
        $id_of_user =$this->getCurrentUser()->id;
        $temp = array();
        $enrolled_courses = EnrollCourse::where('user_id',$id_of_user)->get('course_id');
        foreach( $enrolled_courses as $enrolled)
                { 
                   array_push($temp,$enrolled->course_id);
                }
        $courses = Course::find($temp);
        return response()->json($courses);
    }
    public function gettingStatusOfCourseOfUser($id){
        $id_of_user =$this->getCurrentUser()->id;
        $if_already_enrolled = EnrollCourse::where('user_id',$id_of_user)->where('course_id',$id)->get();
        if(sizeof($if_already_enrolled) > 0)
        return response()->json(false);
        return response()->json(true);
        
    }
}
