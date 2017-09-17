<?php

/* Non-user  Routes*/
Route::get('events', 'EventController@index');
Route::post('unapproved', 'EventController@tempStore');
Route::post('contact', 'ContactController@submitForm');


/* Authentication Routes */
Route::post('/register', 'UserController@signup');
Route::post('/signin', 'UserController@signin');
Route::post('/admin-signin', 'AdminController@signin');


/* User Routes */
Route::post('events', [
  'uses' => 'EventController@store',
  'middleware' => 'auth.jwt'
]);
Route::put('events/{id}', [
  'uses' => 'EventController@update',
  'middleware' => 'auth.jwt'
]);
Route::delete('events/{id}', [
  'uses' => 'EventController@delete',
  'middleware' => 'auth.jwt'
]);


/* Admin Routes */
Route::get('unapproved', [
  'uses' => 'AdminController@indexEvents',
  'middleware' =>'auth.jwt'
]);
Route::put('unapproved/{id}', [
  'uses' => 'AdminController@approveEvent',
  'middleware' =>'auth.jwt'
]);
Route::delete('unapproved/{id}', [
  'uses' => 'AdminController@deleteEvent',
  'middleware' =>'auth.jwt'
]);

Route::get('new-users', [
  'uses' => 'AdminController@indexNewUsers',
  'middleware' =>'auth.jwt'
]);
Route::get('all-users', [
  'uses' => 'AdminController@indexAllUsers',
  'middleware' =>'auth.jwt'
]);
Route::put('new-users/{id}', [
  'uses' => 'AdminController@approveUser',
  'middleware' =>'auth.jwt'
]);
Route::put('make-admin/{id}', [
  'uses' => 'AdminController@makeAdmin',
  'middleware' =>'auth.jwt'
]);
Route::delete('new-users/{id}', [
  'uses' => 'AdminController@deleteUser',
  'middleware' =>'auth.jwt'
]);
