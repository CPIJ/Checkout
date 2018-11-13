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
            <button @click="changeValue(product, -1)" class="left change">
               <fa icon="minus"></fa>
            </button>
            {{product.amount}} 
            <button @click="changeValue(product, 1)" class="right change">
               <fa icon="plus"></fa>
            </button>
         </td>
         <td>€{{calculatePrice(product)}}</td>
         <td>
            <button @click="remove(product)" class="right danger">
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
   <button @click="back" class="back"><fa icon="chevron-left"></fa></button>
   <button @click="checkout" class="checkout"><fa icon="money-bill"></fa></button>
   <br>
</div>
</template>

<script>
export default {
  async mounted() {
    this.cart = await this.$productService.getShoppingCart(this.$store.state.userId);
    this.products = this.cart.items
  },

  data() {
    return {
      products: [],
      onUpdateDatabase: null
    };
  },

  methods: {
    calculatePrice(product) {
      return (product.price * product.amount).toFixed(2);
    },

    changeValue(product, amount) {
      product.amount += amount;
      clearTimeout(this.onUpdateDatabase)
      this.onUpdateDatabase = setTimeout(this.saveState, 1000)
    },

    remove(product) {
      if (confirm(`Weet je zeker dat je ${product.name} wil verwijderen?`)) {
        this.products = this.products.filter(p => p.name !== product.name);
        clearTimeout(this.onUpdateDatabase)
        this.onUpdateDatabase = setTimeout(this.saveState, 1000)
      }
    },

    back() {
        this.$router.push({ name: 'shop' })
    },

    checkout() {
      this.$router.push({ name: 'checkout' })
    },

    async saveState() {
      const updatedList = this.products.flatMap(p => Array(p.amount).fill(p.ean))
      this.$productService.saveCart(this.cart.id, updatedList)
    }
  },

  computed: {
    totalAmount() {
      return this.products.reduce(
        (acc, curr) => (acc += curr.price * curr.amount),
        0
      ).toFixed(2);
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

.back {
    position: fixed;
    bottom: 0;
    height: 8vh;
    width: 100%;
    background-color: lightblue;
}

.checkout {
    position: fixed;
    bottom: 8vh;
    height: 8vh;
    width: 100%;
    background-color: steelblue;
}
</style>
