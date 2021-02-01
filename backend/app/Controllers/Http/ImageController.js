'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Image = use("App/Models/Image");

/**
 * Resourceful controller for interacting with images
 */
class ImageController {
  async index({ request, response, view }) {
  }
  async create({ request, response, view }) {
  }
  async store({ request, response }) {
    const data = request.post();
    const imageAlreadyExists = await Image.findBy('name', data.name);
    if (imageAlreadyExists) {
      return response.status(409).json({ message: 'Image Already Exists' });
    }
    await Image.create(data)
      .then((result) => {
        return response.status(200).json(result);
      })
      .catch((error) => {
        return response.status(400).json(error);
      });
  }
  async show({ params, request, response, view }) {
  }
  async edit({ params, request, response, view }) {
  }
  async update({ params, request, response }) {
  }
  async destroy({ params, request, response }) {
  }
}

module.exports = ImageController;
