'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ProductsSchema extends Schema {
  up() {
    this.create('products', (table) => {
      table.increments();
      table.string('name', 45).notNullable();
      table.integer('stock_balance');
      table.integer('price');
      table
        .integer('image_id')
        .unsigned()
        .references('id')
        .inTable('images')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('category_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('categories')
        .onUpdate('CASCADE');
      table.timestamps();
    });
  }

  down() {
    this.drop('products');
  }
}

module.exports = ProductsSchema;
