<?php

namespace App\Http\Controllers;

use App\Quiz as QuizModel;
use Illuminate\Http\Request;
class Quiz extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        $quizes =array();
        $temp  =  (QuizModel::where('topic_id',$id)->get());
        foreach($temp as $quiz){
            $quiz_id = $quiz["quiz_id"];
            $question = $quiz["question"];
            $options = $quiz["possible_answer"];
            $correct = $quiz["correct_answer"];
            $topic_id = $quiz["topic_id"];
            array_push($quizes,[
                "quiz_id"=> $quiz_id,
                "question"=>$question,
                "options"=>$options,
                "correct" => $correct,
                "topic_id"=>$topic_id
            ]);
        }
        shuffle($quizes);
        return response()->json($quizes);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
