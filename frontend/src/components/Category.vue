<template>
  <div class="categoryContainer">
    <div class="categoryCard">
      <div class="categoryCardTitle">
        <h2>Cadastrar Categoria</h2>
      </div>
      <form class="categoryForm">
        <input
          class="inputAuth"
          type="text"
          name="name"
          id="name"
          placeholder="Nome da Categoria"
          v-model="category.name"
        />
        <button
          class="categoryButtonSubmit"
          type="button"
          id="submit"
          @click="store"
        >
          Cadastrar
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import CategoryService from "../service/category";
export default {
  name: "category",
  data() {
    return {
      category: {
        name: "",
      },
    };
  },
  methods: {
    store() {
      const data = {
        name: this.category.name,
      };

      CategoryService.store(data)
        .then((response) => {
          if (response.status === 200) {
            alert("Categoria cadastrada com sucesso!");
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
.categoryContainer {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.categoryCard {
  border: 1px solid var(--main-color);
  border-radius: 30px;
  padding: 60px;
  margin-bottom: 80px;
}
.categoryCard:hover {
  transition: var(--default-transition);
  border: 4px solid var(--main-color);
}

.categoryCardTitle {
  padding-bottom: 70px;
}
.categoryCardTitle h2 {
  text-align: center;
}
.categoryForm {
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
.categoryButtonSubmit {
  height: 35px;
  width: 300px;
  cursor: pointer;
  background-color: var(--main-color) !important;
  color: white;
}
.categoryButtonSubmit:hover {
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
</style>
