<template>
<div id="shopping-cart">
   <table>
      <tr>
         <td>Naam</td>
         <td>Aantal</td>
         <td>Prijs</td>
         <td></td>
      </tr>
      <tr v-for="product of products" :key="product.name">
         <td>{{product.name}}</td>
         <td style="text-align: center;">
            <button class="left change">
               <fa icon="minus"></fa>
            </button>
            {{product.amount}} 
            <button class="right change">
               <fa icon="plus"></fa>
            </button>
         </td>
         <td>€{{calculatePrice(product)}}</td>
         <td>
            <button class="right danger">
               <fa icon="trash"></fa>
            </button>
         </td>
      </tr>
      <tr>
         <td></td>
         <td></td>
         <td><b>€{{totalAmount}}</b></td>
         <td></td>
      </tr>
   </table>
   <br>
</div>
</template>

<script>
export default {
  async mounted() {
    this.products = await this.$productService.getShoppingCart(
      this.$store.state.userId
    );
  },

  data() {
    return {
      products: []
    };
  },

  methods: {
    calculatePrice(product) {
      return product.price * product.amount;
    }
  },

  computed: {
    totalAmount() {
      return this.products.reduce(
        (acc, curr) => (acc += curr.price * curr.amount),
        0
      );
    }
  }
};
</script>

<style scoped>
* {
  color: black;
}

table {
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

table td,
table th {
  border: 1px solid #ddd;
  padding: 8px;
}

table tr:nth-child(even) {
  background-color: #f2f2f2;
}

table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #4caf50;
  color: white;
}

table tr:first-child {
  font-weight: bold;
  background-color: lightblue;
  color: white;
}

button {
  margin: 0;
  padding: 0.5em;
  border: none;
  outline: none;
  float: right;
  font-size: 0.8em;
}

button.right {
    float: right;
}

button.left {
    float: left;    
}

button.danger {
    background-color: salmon;
}

button.change {
    background-color: lightblue;
}
</style>