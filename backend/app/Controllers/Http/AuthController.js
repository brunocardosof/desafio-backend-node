'use strict';

// const User = use("App/Models/User");

class AuthController {

  async signin({ request, response, auth }) {
    const data = request.post();
    return await auth.attempt(data.email, data.password);

  }

}

module.exports = AuthController;
