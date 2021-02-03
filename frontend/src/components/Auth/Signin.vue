<template>
  <div class="signinContainer">
    <div class="signinCard">
      <div class="signinCardTitle">
        <h2>Faça seu login</h2>
      </div>
      <form class="signinForm">
        <input
          class="inputAuth"
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          v-model="signin.email"
        />
        <input
          class="inputAuth"
          type="password"
          name="password"
          id="password"
          placeholder="Senha"
          v-model="signin.password"
        />
        <button
          class="signinButtonSubmit"
          type="button"
          id="submit"
          @click="signinUser"
        >
          Entrar
        </button>
        <p class="signupRedirectionText">
          Não possui cadastro?
          <router-link to="/signup" class="signupLink">Clique Aqui</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import AuthService from "../../service/auth";
import jwt_decode from "jwt-decode";

export default {
  name: "signin",
  data() {
    return {
      signin: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    signinUser() {
      const data = {
        email: this.signin.email,
        password: this.signin.password,
      };

      AuthService.signin(data)
        .then((response) => {
          if (response.status === 200) {
            const jwtDecode = jwt_decode(response.data.token);
            const user = {
              email: this.signin.email,
              id: jwtDecode.uid,
            };
            localStorage.setItem("loggedUser", JSON.stringify(user));
            this.$router.push({ name: "product" });
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
.signinContainer {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.signinCard {
  border: 1px solid var(--main-color);
  border-radius: 30px;
  padding: 60px;
  margin-bottom: 80px;
}
.signinCard:hover {
  transition: var(--default-transition);
  border: 4px solid var(--main-color);
}
.signinCardTitle {
  padding-bottom: 70px;
}
.signinCardTitle h2 {
  text-align: center;
}
.signinForm {
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
.signinButtonSubmit {
  height: 35px;
  width: 300px;
  cursor: pointer;
  background-color: var(--main-color) !important;
  color: white;
}
.signinButtonSubmit:hover {
  transition: var(--default-transition);
  background-color: white !important;
  color: var(--main-color);
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
@media (max-width: 480px) {
  .signinCard {
    padding: 15px;
    margin-left: 10px;
    margin-right: 10px;
  }
  .signupRedirectionText {
    font-size: 18px;
  }
  .signupLink {
    font-size: 24px;
  }
  form .inputAuth {
    width: 280px;
    border: 1px solid var(--main-color);
  }
}
</style>
