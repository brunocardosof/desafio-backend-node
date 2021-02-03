<template>
  <div id="app">
    <nav class="navbar">
      <li class="nav-item">
        <router-link to="/category" class="nav-link">Categoria</router-link>
      </li>
      <li class="nav-item product">
        <router-link to="/product" class="nav-link">Produto</router-link>
      </li>
      <li class="nav-item sale">
        <router-link to="/sale" class="nav-link">Venda</router-link>
      </li>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
.navbar {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: var(--main-color) !important;
  height: 80px;
}
li {
  font-size: 30px;
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
.sale {
  padding-left: 30px;
}
</style>
