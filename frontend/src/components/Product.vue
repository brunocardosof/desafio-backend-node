<template>
  <div class="productContainer">
    <div class="productCard">
      <div class="productCardTitle">
        <h2>Cadastrar Produto</h2>
      </div>
      <form class="productForm">
        <input
          class="inputAuth"
          type="text"
          name="name"
          id="name"
          placeholder="Nome do Produto"
          v-model="product.name"
        />
        <input
          class="inputAuth"
          type="number"
          name="stock_balance"
          id="stock_balance"
          placeholder="Estoque"
          v-model="product.stock_balance"
        />
        <input
          class="inputAuth"
          type="number"
          name="price"
          id="price"
          placeholder="Preço"
          v-model="product.price"
        />
        <label for="role">Categoria</label>
        <select
          class="inputAuth"
          name="role"
          id="role"
          v-model="product.category_id"
        >
          <option
            v-for="category in categories"
            :key="category.id"
            v-bind:value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
        <button
          class="productButtonSubmit"
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
import ProductService from "../service/product";
import CagetoryService from "../service/category";
export default {
  name: "product",
  data() {
    return {
      product: {
        name: "",
        stock_balance: "",
        price: "",
        category_id: "",
      },
      categories: [],
    };
  },
  methods: {
    async getCategories() {
      await CagetoryService.index()
        .then((response) => {
          this.categories = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async store() {
      const data = {
        name: this.product.name,
        stock_balance: this.product.stock_balance,
        price: this.product.price,
        category_id: this.product.category_id,
      };

      await ProductService.store(data)
        .then((response) => {
          if (response.status === 200) {
            alert("Produto cadastrada com sucesso!");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.getCategories();
  },
};
</script>

<style>
.productContainer {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.productCard {
  border: 1px solid var(--main-color);
  border-radius: 30px;
  padding: 60px;
  margin-bottom: 80px;
}
.productCard:hover {
  transition: var(--default-transition);
  border: 4px solid var(--main-color);
}

.productCardTitle {
  padding-bottom: 70px;
}
.productCardTitle h2 {
  text-align: center;
}
.productForm {
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
.productButtonSubmit {
  height: 35px;
  width: 300px;
  cursor: pointer;
  background-color: var(--main-color) !important;
  color: white;
}
.productButtonSubmit:hover {
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
  .productCard {
    padding: 15px;
    margin-left: 10px;
    margin-right: 10px;
  }
  form .inputAuth {
    width: 280px;
    border: 1px solid var(--main-color);
  }
}
</style>
