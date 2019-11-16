<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User_Progress as Progress;
use App\Topics;
use Illuminate\Support\Facades\Auth;
class user_progress extends Controller
{
    public function updateNumbers(Request $request){
        $topic_id = $request->id;
        $quiz_marks = $request->marks;
        Progress::where('topic_id',$topic_id)->update(['quiz_marks'=>$quiz_marks]);
     if($quiz_marks >= 5 ){
            $course_collection  = Progress::where('topic_id',$topic_id)->get();
            $course_id = $course_collection[0]->course_id;
            $allTopics = Topics::where("course_id",$course_id)->pluck("topic_id")->toArray();
            $topicAlreadyEnrolled = Progress::where("course_id",$course_id)->pluck("topic_id")->toArray();
            foreach($topicAlreadyEnrolled as $topicsEnrolled){
                if (($key = array_search($topicsEnrolled, $allTopics)) !== false) {
                 array_splice($allTopics,$key,1);
                }
            }
             if(sizeof($allTopics)> 0 )  
 {               $newTopicProgress = new Progress();
                $newTopicProgress->course_id = $course_id;
                $newTopicProgress->topic_id = $allTopics[0];
                $newTopicProgress->user_id = Auth::guard()->user()->id;
                $newTopicProgress->save();
}      
else response()->json("Course Completed");  
        }
        else{
            return response()->json("Marks Too Low Cannot Proceed Firther");
        }
            

    }
    public function getStatus($id){
        $user_id    = Auth::guard()->user()->id;
        return \response()->json(Progress::where("course_id",$id)->where('user_id',$user_id)->pluck('topic_id')->toArray());
    }

    public function calculateProgress($id){
        $user_id = Auth::guard()->user()->id;
        $nmbr_topics = Topics::where('course_id',$id)->count("*");
        $topics_cleared = Progress::where('user_id',$user_id)->where('course_id',$id)->where('quiz_marks','>=','5')->count("*");
        return $topics_cleared/$nmbr_topics;
    }
}   
