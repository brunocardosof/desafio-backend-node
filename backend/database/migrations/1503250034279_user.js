'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserSchema extends Schema {
  up() {
    this.create('users', (table) => {
      table.increments();
      table.string('username', 45);
      table.string('email', 45).notNullable().unique();
      table.string('password', 90);
      table.timestamps();
    });
  }

  down() {
    this.drop('users');
  }
}

module.exports = UserSchema;
