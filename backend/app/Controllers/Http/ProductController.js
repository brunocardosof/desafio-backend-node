'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Product = use("App/Models/Product");

/**
 * Resourceful controller for interacting with products
 */
class ProductController {
  async index({ request, response }) {
  }
  async store({ request, response }) {
    const data = request.post();
    const productAlreadyExists = await Product.findBy('name', data.name);
    if (productAlreadyExists) {
      return response.status(409).json({ message: 'Product Already Exists' });
    }
    await Product.create(data)
      .then((result) => {
        return response.status(200).json(result);
      })
      .catch((error) => {
        return response.status(400).json(error);
      });
  }
  async show({ params, request, response }) {
  }
  async update({ params, request, response }) {
  }
  async destroy({ params, request, response }) {
  }
}

module.exports = ProductController;
