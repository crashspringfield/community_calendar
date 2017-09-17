<?php

namespace App\Http\Controllers;

use App\Event;
use Mail;
use JWTAuth;
use Illuminate\Http\Request;

class EventController extends Controller
{

  public function index()
  {
    return Event::where('approved', 1)->get();
  }

  public function tempStore(Request $request)
  {
    $event = new Event();
    $event->title = $request['title'];
    $event->start = $request['start'];
    $event->end = $request['end'];
    $event->location = $request['location'];
    $event->eventType = $request['eventType'];
    $event->description = $request['description'];
    $event->link = $request['link'];
    $event->contact = $request['contact'];
    $event->approved = 0;
    $event->save();

    Mail::send('emails.event', [
      'title' => $request['title'],
      'start' => $request['start'],
      'description' => $request['description']
    ], function($message) {
      $message->from('avlcommunityaction@gmail.com', 'AVL Community Calendar');
      $message->to('avlcommunityaction@gmail.com');
      $message->subject('An event needs approval');
    });

    return response()->json(['event' => $event], 201);
  }

  public function store(Request $request)
  {
    $user = JWTAuth::parseToken()->toUser();

    $event = new Event();
    $event->title = $request['title'];
    $event->start = $request['start'];
    $event->end = $request['end'];
    $event->location = $request['location'];
    $event->eventType = $request['eventType'];
    $event->description = $request['description'];
    $event->link = $request['link'];
    $event->contact = $request['contact'];
    $event->userEmail = $request['userEmail'];
    $event->approved = 1;
    $event->save();

    return response()->json([
      'event' => $event,
      'user' => $user
    ], 201);
  }

  public function update(Request $request, $id)
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
    return response()->json(['event' => $event], 200);
  }

  public function delete($id)
  {
    $event = Event::find($id);
    $event->delete();
    return response()->json(null, 204);
  }
}
