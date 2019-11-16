<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post("register","AuthController@create");
Route::post('login', 'AuthController@login');
Route::post('logout', 'AuthController@logout');
Route::post('refresh', 'AuthController@refresh');
Route::get('me', 'AuthController@me');
// Route::get('quiz', 'Quiz@index');
Route::get('lectures','lecture@lectures');
Route::get("topics","topics@getTopics");
Route::get('get-courses',"course@getCourses");
Route::get("enroll-course/{id}","enroll_course@enrollCourse");
Route::get("enrolled-courses","enroll_course@getEnrolledCourses");
Route::get("checking-enrolled/{id}","enroll_course@gettingStatusOfCourseOfUser");
Route::get("load_lectures/{id}","lecture@lecturesOfSpecificCourse");
Route::get("quiz/{id}","Quiz@index");
Route::get("load_books/{id}","lecture@books");
Route::get("load_papers/{id}","lecture@papers");
Route::post("update-user","UserActionController@updateUser");
Route::post("update-password","UserActionController@updatePassword");
Route::post("update-marks","user_progress@updateNumbers");
Route::post("create-user","UserActionController@createUser");
Route::get("get-status/{id}","user_progress@getStatus");
Route::get("get-progress/{id}","user_progress@calculateProgress");
