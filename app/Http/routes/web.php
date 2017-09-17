<?php

Route::get('/', function() {
  return view('welcome');
});

Route::get('/about', function() {
  return view('welcome');
});

Route::get('/contact', function() {
  return view('welcome');
});

Route::get('/resources', function() {
  return view('welcome');
});

Route::get('/admin', function() {
  return view('welcome');
});

Route::auth();
