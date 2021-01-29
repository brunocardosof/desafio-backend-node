'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Category = use("App/Models/Category");

/**
 * Resourceful controller for interacting with categories
 */
class CategoryController {
  async index({ request, response, view }) {
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
