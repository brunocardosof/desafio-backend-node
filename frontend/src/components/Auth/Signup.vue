<template>
  <div class="signupContainer">
    <div class="signupCard">
      <div class="signupCardTitle">
        <h2>Faça seu cadastro</h2>
      </div>
      <form class="signupForm">
        <input
          class="inputAuth"
          type="text"
          name="username"
          id="username"
          placeholder="Nome"
          v-model="signup.username"
        />
        <input
          class="inputAuth"
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          v-model="signup.email"
        />
        <input
          class="inputAuth"
          type="password"
          name="password"
          id="password"
          placeholder="Senha"
          v-model="signup.password"
        />
        <label for="role">Tipo do Usuário</label>
        <select class="inputAuth" name="role" id="role" v-model="signup.role">
          <option value="admin">Admin</option>
          <option value="client">Cliente</option>
        </select>
        <button
          class="signupButtonSubmit"
          type="button"
          id="submit"
          @click="signupUser"
        >
          Cadastrar
        </button>
        <p class="signinRedirectionText">
          Já possui cadastro?
          <router-link to="/signin" class="signinLink">Clique Aqui</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import AuthService from "../../service/auth";
export default {
  name: "signup",
  data() {
    return {
      signup: {
        username: "",
        email: "",
        password: "",
        role: "",
      },
    };
  },
  methods: {
    signupUser() {
      const data = {
        username: this.signup.username,
        email: this.signup.email,
        password: this.signup.password,
        role: this.signup.role,
      };

      AuthService.signup(data)
        .then((response) => {
          if (response.status === 200) {
            alert("Cadastro realizado com sucesso!");
            this.$router.push({ name: "signin" });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style>
.signupContainer {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.signupCard {
  border: 1px solid var(--main-color);
  border-radius: 30px;
  padding: 60px;
  margin-bottom: 80px;
}
.signupCard:hover {
  transition: var(--default-transition);
  border: 4px solid var(--main-color);
}
.signupCardTitle {
  padding-bottom: 70px;
}
.signupCardTitle h2 {
  text-align: center;
}
.signupForm {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
form .inputAuth {
  margin-bottom: 25px;
  height: 35px;
  width: 300px;
  padding-left: 30px;
}
.signupButtonSubmit {
  height: 35px;
  width: 300px;
  cursor: pointer;
  background-color: var(--main-color) !important;
  color: white;
}
.signupButtonSubmit:hover {
  transition: var(--default-transition);
  background-color: white !important;
  color: var(--main-color);
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

@media (max-width: 480px) {
  .signupCard {
    padding: 15px;
    margin-left: 10px;
    margin-right: 10px;
  }
  .signinRedirectionText {
    font-size: 18px;
  }
  .signinLink {
    font-size: 24px;
  }
  form .inputAuth {
    width: 280px;
    border: 1px solid var(--main-color);
  }
}
</style>
