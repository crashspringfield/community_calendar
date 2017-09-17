<?php

namespace App\Http\Controllers;

use Mail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ContactController extends Controller
{
  public function submitForm(Request $request)
  {
    $this->validate($request, [
      'g-recaptcha-response' => 'required|recaptcha',
    ]);

    Mail::send('emails.contact', [
      'email' => $request['email'],
      'title' => $request['title'],
      'text' => $request['message']
    ], function($message) {
      $message->from('avlcommunityaction@gmail.com', 'AVL');
      $message->to('avlcommunityaction@gmail.com');
      $message->subject('Someone has contacted the site');
    });
    return response()->json([], 201);
  }
}
