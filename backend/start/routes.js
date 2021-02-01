'use strict';

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.group(() => {
  Route.resource('users', 'UserController').apiOnly();
});

Route.group(() => {
  Route.post('/signin', 'AuthController.signin');
  Route.post('/forgotPassword', 'AuthController.forgotPassword');
}).prefix('auth');

Route.group(() => {
  Route.get('/', 'CategoryController.index');
  Route.post('/', 'CategoryController.store');
  Route.put('/:id', 'CategoryController.update');
}).prefix('category');

Route.group(() => {
  Route.post('/', 'ImageController.store');
}).prefix('image');
