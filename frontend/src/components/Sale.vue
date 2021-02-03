<template>
  <div class="saleContainer">
    <div class="saleCard">
      <div class="saleCardTitle">
        <h2>Realizar Venda</h2>
      </div>
      <form class="saleForm">
        <label for="role">Produto</label>
        <select
          class="inputAuth"
          name="product_id"
          id="product_id"
          v-model="sale.product_id"
          @change="onChangeProduct($event)"
        >
          <option
            v-for="product in products"
            :key="product.id"
            v-bind:value="product.id"
          >
            <strong>Produto: </strong> {{ product.name }} <br />
            <strong>Valor: </strong> {{ product.price }}
          </option>
        </select>
        <input
          class="inputAuth"
          type="number"
          name="quantity"
          id="quantity"
          placeholder="Quantidade"
          v-model="sale.quantity"
          @input="totalCalc"
        />
        <div v-if="sale.quantity" class="totalPrice">
          <p>Valor Total R${{ totalPrice }}</p>
        </div>
        <button
          class="saleButtonSubmit"
          type="button"
          id="submit"
          @click="saleProduct"
        >
          Vender
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import SaleService from "../service/sale";
import ProductService from "../service/product";
export default {
  name: "sale",
  data() {
    return {
      sale: {
        name: "",
        stock_balance: "",
        price: "",
        product_id: "",
        user_id: "",
        quantity: "",
        date: new Date().toLocaleString(),
      },
      products: [],
      currentProduct: "",
      showTotalPrice: false,
      totalPrice: "",
    };
  },
  methods: {
    async getCategories() {
      await ProductService.index()
        .then((response) => {
          this.products = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    onChangeProduct(event) {
      this.sale.quantity = "";
      this.products.filter((product) => {
        if (event.target.value == product.id) {
          this.currentProduct = product;
          this.sale.stock_balance = product.stock_balance;
          this.sale.price = product.price;
        }
      });
    },
    totalCalc() {
      this.totalPrice = this.currentProduct.price * this.sale.quantity;
    },
    async saleProduct() {
      const user = localStorage.getItem("loggedUser");
      const data = {
        quantity: this.sale.quantity,
        price: this.sale.price,
        product_id: this.sale.product_id,
        user_id: user.id,
        date: this.sale.date,
      };

      await SaleService.saleProduct(data)
        .then((response) => {
          if (response.status === 204) {
            alert("Venda realizada com sucesso!");
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
.saleContainer {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.saleCard {
  border: 1px solid var(--main-color);
  border-radius: 30px;
  padding: 60px;
  margin-bottom: 80px;
}
.saleCard:hover {
  transition: var(--default-transition);
  border: 4px solid var(--main-color);
}

.saleCardTitle {
  padding-bottom: 70px;
}
.saleCardTitle h2 {
  text-align: center;
}
.saleForm {
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
.saleButtonSubmit {
  height: 35px;
  width: 300px;
  cursor: pointer;
  background-color: var(--main-color) !important;
  color: white;
}
.saleButtonSubmit:hover {
  transition: var(--default-transition);
  background-color: white !important;
  color: var(--main-color);
}
.totalPrice {
  margin-bottom: 20px;
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
.saleCard {
  padding: 15px;
  margin-left: 10px;
  margin-right: 10px;
}
@media (max-width: 480px) {
  .saleCard {
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
