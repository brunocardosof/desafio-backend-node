'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User = use("App/Models/User");
const Database = use('Database');


/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index({ request }) {
    const query = request.get();
    if (query.keyword) {
      return await Database
        .from('users')
        .where(function () {
          this
            .where('username', query.keyword)
            .orWhere('email', query.keyword);
        });
    }
    return await Database
      .from('users')
      .paginate(query.page, 10);

  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.post();
    const userAlreadyExists = await User.findBy('email', data.email);
    if (userAlreadyExists) {
      return response.status(409).json({ message: 'User Already Exists' });
    }
    await User.create(data)
      .then((result) => {
        return response.status(200).json(result);
      })
      .catch((error) => {
        return response.status(400).json(error);
      });
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params }) {
    return await User.findOrFail(params.id);

  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const user = await User.findOrFail(params.id);
    const data = request.post();
    user.merge(data);
    await user.save()
      .then((result) => {
        if (!result) return response.status(202).json({ message: 'Nothing has been updated' });
        return response.status(200).json(result);
      })
      .catch((error) => {
        return response.status(400).json(error);
      });
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, response }) {
    const user = await User.findOrFail(params.id);
    if (!user) return user;
    return response.status(200).json(await user.delete());
  }
}

module.exports = UserController;
