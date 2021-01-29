'use strict';

const Mail = use('Mail');

class AuthController {

  async signin({ request, response, auth }) {
    const data = request.post();
    return await auth.attempt(data.email, data.password);
  }

  async forgotPassword({ request, response, auth }) {
    const user = request.only(['email', 'username', 'password', 'link']);
    await Mail.send('emails.password', user, (message) => {
      message
        .to(user.email)
        .from('<from-email>')
        .subject(`Recureração de Senha`);
    });
    return true;
  }

}

module.exports = AuthController;
