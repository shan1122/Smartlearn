<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\topics as TopicModel;
class topics extends Controller
{
    //
    public function getTopics(){
        return TopicModel::all();
    }
}
