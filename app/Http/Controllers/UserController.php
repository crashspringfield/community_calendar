<?php

namespace App\Http\Controllers;

use Mail;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Exceptions\JWTException;
use JWTAuth;

class UserController extends Controller
{

  public function signup(Request $request)
  {
    $this->validate($request, [
      'name' => 'required|max:120',
      'email' => 'required|email|unique:users',
      'password'  => 'required|min:4',
    ]);

    $user = new User([
      'name' => $request->input('name'),
      'email' => $request->input('email'),
      'password' => bcrypt($request->input('password')),
      'bio' => $request->input('bio')
    ]);
    $user->save();

    Mail::send('emails.newuser', [
      'email' => $request->input('email'),
      'name' => $request->input('name'),
      'bio' => $request->input('bio')
    ], function($message){
      $message->from('avlcommunityaction@gmail.com', 'AVL Community Calendar');
      $message->to('avlcommunityaction@gmail.com');
      $message->subject('Someone just signed up');
    });

    return response()->json(['message' => 'User successfully created'], 201);
  }

  public function signin(Request $request)
  {
    $this->validate($request, [
      'email' => 'required|email',
      'password'  => 'required|min:4',
    ]);

    $credentials = $request->only('email', 'password');

    try {
      if (!$token = JWTAuth::attempt($credentials)) {
        return response()->json(['error' => 'Invalid Credentials'], 401);
      }
    } catch (JWTException $e) {
      return response()->json(['error' => 'Could not create token'], 500);
    }

    if (Auth::attempt([
      'email' => $request->input('email'),
      'password' => $request->input('password'),
      'verified' => 1
      ])) {
      return response()->json([
        'token' => $token,
        'email' => $request->input('email')
      ], 200);
    }
    return response()->json(['error' => 'Invalid Credentials'], 401);
  }

}
