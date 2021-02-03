<template class="container">
  <div class="card">
    <div class="card-header"></div>
    <form>
      <input type="text" name="username" id="username" placeholder="Nome" />
      <input type="email" name="email" id="email" placeholder="Email" />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Senha"
      />
      <input type="text" name="role" id="rolepassword" placeholder="Tipo do " />
      <label for="cars">Tipo do Usuário</label>
      <select name="role" id="role">
        <option value="admin">Administrador</option>
        <option value="client">Cliente</option>
      </select>
      <button type="button" id="submit">Cadastrar</button>
      <p class="signinRedirectionText">
        Já possui cadastro?
        <router-link to="/signin" class="signinLink">Clique Aqui</router-link>
      </p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "Hello World!",
    };
  },
};
</script>

<style>
.container {
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.card {
  border: 1px solid var(--main-color);
  border-radius: 30px;
  padding: 30px;
}
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
form input {
  margin-bottom: 25px;
}
form select {
  margin-bottom: 25px;
}
.signinRedirectionText {
  margin-top: 30px;
  font-size: 30px;
  color: #000 !important;
}
.signinLink {
  text-decoration: none;
  color: #000 !important;
  font-size: 36px;
}
.signinLink:hover {
  transition: var(--default-transition);
  text-decoration: none;
  color: indigo !important;
}
</style>
