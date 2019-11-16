<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\User;
class UserActionController extends Controller
{
    public function updateUser(Request $req){
        $newFName = $req->fName;
        $newLName = $req->lName;
        $currentUser = Auth::guard()->user()->id;
        $user = User::find($currentUser);
        $user->name = $newFName." ".$newLName;
        $user->save();
        return response()->json(["Updated Successfully"],200);
    }
    public function updatePassword(Request $req){
        $oldPassword = $req->oldPassword;
        $newPassword = $req->newPassword;
        $currentUser = Auth::guard()->user()->id;
        $user = User::find($currentUser);
        if( strlen($newPassword) < 3 )
        return response()->json(["New Password Rejected"],400);
        if(Hash::check($oldPassword,$user->password)){
                $user->password = Hash::make($newPassword);
                $user->save();
               return response()->json(["Password Updated Successfullly"],400);
        }
        else return response()->json(["Old Password Is InCorrect"],400);
    }
    public function createUser(Request $req){
        try
            {               
            $newUser = new User();
            $newUser->name = $req->name;
            $newUser->email = $req->email;
            $newUser->password = Hash::make($req->password);
            $response =  $newUser->save();
            if(($response) == 1)
            return response()->json("Sign Up Successfull",200);}
            catch(Exception $e)
            {
              return response()->json("Cannot Creat Account ",400);
            }
            
        }
}
