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
  Route.post('/auth/signin', 'AuthController.signin');
  Route.post('/auth/forgotPassword', 'AuthController.forgotPassword');
});

Route.group(() => {
  Route.get('/', 'CategoryController.index');
  Route.post('/', 'CategoryController.store').middleware(["adminAuth"]);
  Route.put('/:id', 'CategoryController.update').middleware(["adminAuth"]);
}).prefix('category');

Route.group(() => {
  Route.get('/', 'ProductController.index');
  Route.post('/', 'ProductController.store').middleware(["adminAuth"]);
  Route.put('/changeStockBalance/:id', 'ProductController.changeStockBalance');
  Route.put('/:id', 'ProductController.update').middleware(["adminAuth"]);
  Route.delete('/:id', 'ProductController.destroy').middleware(["adminAuth"]);
}).prefix('product');

Route.group(() => {
  Route.get('/', 'SaleController.index').middleware(["adminAuth"]);
  Route.post('/', 'SaleController.sale');
  Route.delete('/:id', 'SaleController.cancelSale');
}).prefix('sale');
Route.group(() => {
  Route.post('/', 'ImageController.store');
}).prefix('image');
