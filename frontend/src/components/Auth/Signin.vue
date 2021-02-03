<template class="container">
  <div class="card">
    <div class="card-header"></div>
    <form>
      <input type="email" name="email" id="email" placeholder="Email" />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Senha"
      />
      <button type="button" id="submit">Entrar</button>
      <p class="signupRedirectionText">
        Não possui cadastro?
        <router-link to="/signup" class="signupLink">Clique Aqui</router-link>
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
  padding: 60px;
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
.signupRedirectionText {
  margin-top: 30px;
  font-size: 30px;
  color: #000 !important;
}
.signupLink {
  text-decoration: none;
  color: #000 !important;
  font-size: 36px;
}
.signupLink:hover {
  transition: var(--default-transition);
  text-decoration: none;
  color: indigo !important;
}
</style>
