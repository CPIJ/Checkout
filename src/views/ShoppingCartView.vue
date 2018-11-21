<template>
  <v-content>
    <v-container fluid>
      <v-toolbar color="primary" dark app>
        <v-toolbar-title>Winkelwagen</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn @click="$router.go(-1)" flat><v-icon>arrow_back</v-icon></v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-data-table :loading="loading" class="elevation-1" hide-actions
        :headers="headers"
        :items="products"
      >
        <template slot="items" slot-scope="props">
          <tr @click="show = true; selectedProduct = props.item">
            <td>{{props.item.name}}</td>
            <td>
              <v-edit-dialog
                :return-value.sync="props.item.amount"
                @save="changeValue(props.item)"
              >
                {{props.item.amount}}
                <v-text-field
                  slot="input"
                  v-model="props.item.amount"
                  label="Aantal"
                ></v-text-field>
              </v-edit-dialog>
            </td>
            <td>€{{calculatePrice(props.item)}}</td>
            <td class="text-sm-left"><v-icon @click="remove(props.item)">delete</v-icon></td>
          </tr>
        </template>
        <template v-if="!loading" slot="footer">
          <td></td>
          <td>Totaal</td>
          <td class="font-weight-bold">€{{totalAmount}}</td> 
          <td></td>
      </template>
      </v-data-table>
      <v-divider></v-divider>
      <v-btn 
        style="left:25%; right:25%; width:50%" 
        to="/checkout" 
        fixed 
        bottom 
        block 
        color="info">
          afrekenen
        </v-btn>
    </v-container>
  </v-content>
</template>

<script>
export default {
  async mounted() {
    this.cart = await this.$productService.getShoppingCart(
      this.$store.state.userId
    );
    this.products = this.cart.items;
    this.loading = false;
  },

  data() {
    return {
      products: [],
      onUpdateDatabase: null,
      loading: true,
      show: false,
      selectedProduct: null,
      headers: [
        {
          text: "Product",
          value: "product",
          sortable: false
        },
        {
          text: "Aantal",
          value: "Aantal",
          sortable: false
        },
        {
          text: "Prijs",
          value: "prijs",
          sortable: false
        },
        {
          text: "",
          sortable: false
        }
      ]
    };
  },

  methods: {
    calculatePrice(product) {
      return (product.price * product.amount).toFixed(2);
    },

    changeValue(product) {
      clearTimeout(this.onUpdateDatabase);
      this.onUpdateDatabase = setTimeout(this.saveState, 1000);
    },

    async remove(product) {
      const wantsToDelete = await this.$dialog.confirm({
        text: `Weet je zeker dat je ${product.amount}x ${
          product.name
        } wil verwijderen?`,
        title: "Weet je het zeker?"
      });

      if (wantsToDelete) {
        this.products = this.products.filter(p => p.name !== product.name);
        clearTimeout(this.onUpdateDatabase);
        this.onUpdateDatabase = setTimeout(this.saveState, 1000);
      }
    },

    back() {
      this.$router.push({ name: "shop" });
    },

    checkout() {
      this.$router.push({ name: "checkout" });
    },

    async saveState() {
      const updatedList = this.products.flatMap(p =>
        Array(Number(p.amount)).fill(p.ean)
      );
      this.$productService.saveCart(this.cart.id, updatedList);
    }
  },

  computed: {
    totalAmount() {
      return this.products
        .reduce((acc, curr) => (acc += curr.price * curr.amount), 0)
        .toFixed(2);
    }
  }
};
</script>

<style scoped>
</style>
