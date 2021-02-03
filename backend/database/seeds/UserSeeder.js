'use strict';

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Hash = use('Hash');
const User = use("App/Models/User");

class UserSeeder {
  async run() {
    await User.create({
      "username": "Admin",
      "email": "admin@hotmail.com",
      "password": '123456',
      "role": "admin"
    });
    await User.create({
      "username": "client",
      "email": "client@hotmail.com",
      "password": '123456',
      "role": "client"
    });
  }
}

module.exports = UserSeeder;
