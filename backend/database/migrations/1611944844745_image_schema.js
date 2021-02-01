'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ImageSchema extends Schema {
  up() {
    this.create('images', (table) => {
      table.increments();
      table.string('name', 45);
      table.string('file_name', 255);
      table.timestamps();
    });
  }

  down() {
    this.drop('images');
  }
}

module.exports = ImageSchema;
