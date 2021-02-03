'use strict';
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class AdminAuth {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ auth, response }, next) {
    const user = await auth.getUser();
    if (!user.role || user.role !== "admin")
      return response.status(401).json({ message: "don't have permission!" });
    await next();
  }
}

module.exports = AdminAuth;
