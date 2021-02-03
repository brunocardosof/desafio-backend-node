'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Category = use("App/Models/Category");
const Database = use('Database');

/**
 * Resourceful controller for interacting with categories
 */
class CategoryController {
  async index({ request, response, view }) {
    const queryString = request.get();
    if (queryString.keyword) {
      if (queryString.type === "category") {
        return await User.findBy('name', queryString.keyword);
      } else {
        const sql = `SELECT
        category.id AS category_id,
        category.name AS category_name,
        product.id AS product_id,
        product.name AS product_name,
        product.stock_balance,
        product.price,
        product.image_id,
        product.category_id AS product_category_id_FK
        FROM 
        categories category,
        products product
        WHERE category.id = product.category_id
        AND product.name = ?
      `;
        const result = await Database.raw(sql, [queryString.keyword]);
        return await result[0];
      }
    }
    return await Category.query().with('product').fetch();
  }
  async store({ request, response }) {
    const data = request.post();
    const categoryAlreadyExists = await Category.findBy('name', data.name);
    if (categoryAlreadyExists) {
      return response.status(409).json({ message: 'Category Already Exists' });
    }
    await Category.create(data)
      .then((result) => {
        return response.status(200).json(result);
      })
      .catch((error) => {
        return response.status(400).json(error);
      });
  }
  async show({ params, request, response, view }) {
  }
  async update({ params, request, response }) {
    const category = await Category.findOrFail(params.id);
    const data = request.post();
    category.merge(data);
    await category.save()
      .then((result) => {
        if (!result) return response.status(202).json({ message: 'Nothing has been updated' });
        return response.status(200).json(result);
      })
      .catch((error) => {
        return response.status(400).json(error);
      });
  }
  async destroy({ params, response }) {
    const category = await Category.findOrFail(params.id);
    if (!category) return category;
    return response.status(200).json(await category.delete());
  }
}

module.exports = CategoryController;
