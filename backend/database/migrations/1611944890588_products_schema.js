'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ProductsSchema extends Schema {
  up() {
    this.create('products', (table) => {
      this.create('products', (table) => {
        table.increments();
        table.string('name', 45).notNullable();
        table.integer('stock_balance');
        table.string('image_id', 255);
        table.integer('price');
        table
          .integer('image_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('users')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
        table
          .integer('categorie_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('users')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
        table.timestamps();
      });
    });
  }

  down() {
    this.drop('products');
  }
}

module.exports = ProductsSchema;
