<?php

namespace App\Http\Controllers;

use App\Event;
use App\User;
use Mail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Exceptions\JWTException;
use JWTAuth;

class AdminController extends Controller
{

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
      'verified' => 1,
      'is_admin' => 1
      ])) {
      return response()->json([
        'token' => $token,
        'email' => $request->input('email')
      ], 200);
    }
    return response()->json(['error' => 'Invalid Credentials'], 401);
  }

  /*
   * Calendar events
   */

  public function indexEvents()
  {
    return Event::where('approved', 0)->get();
  }

  public function approveEvent(Request $request, $id)
  {
    $event = Event::find($id);
    if (!$event) {
      return response()->json(['message' => 'event not found'], 404);
    }
    $event->title = $request['title'];
    $event->start = $request['start'];
    $event->end = $request['end'];
    $event->location = $request['location'];
    $event->eventType = $request['eventType'];
    $event->description = $request['description'];
    $event->link = $request['link'];
    $event->contact = $request['contact'];
    $event->approved = 1;
    $event->save();
    return response()->json(['event' => $event], 201);
  }

  public function deleteEvent($id)
  {
    $event = Event::find($id);
    $event->delete();
    return response()->json(null, 204);
  }


  /*
   * Users
   */

   public function indexNewUsers()
   {
     return User::where('verified', 0)->get();
   }

   public function indexAllUsers()
   {
     return User::where('is_admin', 0)->get();
   }

   public function approveUser(Request $request, $id)
   {
     $email = $request['email'];
     $user = User::find($id);
     if (!$user) {
       return response()->json(['message' => 'user not found']);
     }
     $user->verified = 1;
     $user->save();

     Mail::send('emails.approved', [
       'name' => $request['name']
     ], function($message) use($email) {
       $message->from('avlcommunityaction@gmail.com', 'AVL Community Calendar');
       $message->to($email);
       $message->subject('You have been approved');
     });
     return response()->json(['user' => $user], 201);
   }

   public function makeAdmin(Request $request, $id)
   {
     $email = $request['email'];
     $user = User::find($id);
     if (!$user) {
       return response()->json(['message' => 'user not found']);
     }
     $user->is_admin = 1;
     $user->save();

     Mail::send('emails.admin', [
       'name' => $request['name']
     ], function($message) use($email) {
       $message->from('avlcommunityaction@gmail.com', 'AVL Community Calendar');
       $message->to($email);
       $message->subject('You have been granted admin privleges');
     });
     return response()->json(['user' => $user], 201);
   }

   public function deleteUser($id)
   {
     $user = User::find($id);
     $user->delete();
     return response()->json(null, 204);
   }

}
