<?php

namespace App\Exceptions;

use Exception;
// use Illuminate\Validation\ValidationException;
// use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that should not be reported.
     *
     * @var array
     */
    protected $dontReport = [
        AuthorizationException::class,
        HttpException::class,
        ModelNotFoundException::class,
        ValidationException::class,
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Exception  $e
     * @return void
     */
    public function report(Exception $e)
    {
        parent::report($e);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $e
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $e)
    {
        if ($e instanceof ModelNotFoundException && $request->wantsJson()) {
          return response()->json([
            'error' => 'Resource not found'
          ], 404);
        } else if ($e instanceof ModelNotFoundException) {
          return response()->view('errors.404', [], 404);
        } else if ($e instanceof TokenExpiredException) {
          return response()->json([
            'error' => 'Token expired'
          ], $e->getStatusCode());
        } else if ($e instanceof TokenInvalidException) {
          return response()->json([
            'error' => 'Token invalid'
          ], $e->getStatusCode());
        } else if ($e instanceof JWTException) {
          return response()->json([
            'error' => 'Error fetching token'
          ], $e->getStatusCode());
        }
      return parent::render($request, $e);
    }

    protected function unauthenticated($request, AuthenticationException $exception)
    {
        return response()->json(['error' => 'Unauthenticated'], 401);
    }
}
