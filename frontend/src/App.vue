<template>
  <div id="app">
    <nav class="navbar">
      <li class="nav-item category">
        <router-link to="/category" class="nav-link">Categoria</router-link>
      </li>
      <li class="nav-item product">
        <router-link to="/product" class="nav-link">Produto</router-link>
      </li>
      <li class="nav-item sale">
        <router-link to="/sale" class="nav-link">Venda</router-link>
      </li>
      <li style="color: white" class="logout" @click="logout">
        Logout
      </li>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    logout() {
      if (localStorage.getItem("loggedUser")) {
        localStorage.clear();
        window.location.reload();
      } else {
        alert("Você já está deslogado!");
      }
    },
  },
};
</script>

<style>
.navbar {
  display: flex;
  align-items: center;
  background-color: var(--main-color) !important;
  height: 80px;
  widows: 100%;
}
li {
  font-size: 30px;
  text-decoration: none;
  list-style-type: none;
}
li a {
  font-size: 30px;
  color: white !important;
  text-decoration: none;
}
li a:hover {
  font-weight: 700 !important;
  font-size: 34px !important;
  transition: var(--default-transition) !important;
  color: bisque !important;
  border-bottom: 1px solid bisque !important;
}
.nav-link {
  font-weight: 700;
  transition: var(--default-transition);
  color: white;
}
.product,
.sale,
.category {
  padding-left: 30px;
}
.logout {
  cursor: pointer;
  padding-left: 80px;
}

@media (max-width: 480px) {
  li {
    font-size: 20px;
  }
  li a {
    font-size: 20px;
  }
  li a:hover {
    font-size: 30px !important;
  }
  .product,
  .sale,
  .category {
    padding-left: 20px;
  }
  .logout {
    cursor: pointer;
    padding-left: 20px;
  }
}
</style>
