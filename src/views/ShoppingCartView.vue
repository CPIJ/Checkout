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
          <tr :class="{'green lighten-5': props.item.isCharity}" @click="show = true; selectedProduct = props.item">
            <td>{{props.item.name}}</td>
            <td>
              <v-edit-dialog
                :return-value.sync="props.item.amount"
                @save="changeValue(props.item)"
              >
                {{props.item.isCharity ? "" : props.item.amount}}
                <v-text-field
                  slot="input"
                  v-model="props.item.amount"
                  label="Aantal"
                ></v-text-field>
              </v-edit-dialog>
            </td>
            <td>{{props.item.isCharity ? "" : "€" + calculatePrice(props.item)}}</td>
            <td class="text-sm-left"><v-icon @click="remove(props.item)">{{props.item.isCharity ? "" : "delete"}}</v-icon></td>
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
      const wantsToDelete = confirm(
        `Weet u zeker dat u ${product.amount}x ${product.name} wil verwijderen?`
      );

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
      const updatedList = this.products.flatMap(p => {
        const n = Number(p.amount);
        return Array(n > 10 ? 10 : n).fill(p.ean);
      });
      this.$productService.saveCart(this.cart.id, updatedList);
    }
  },

  computed: {
    totalAmount() {
      const total = this.products
        .reduce((acc, curr) => (acc += curr.price * curr.amount), 0)
        .toFixed(2);

      if (this.products.filter(p => p.isCharity).length > 0) {
        const roundedUp = Math.ceil(total).toFixed(2);

        if (roundedUp === total) {
          return (Number(roundedUp) + 1).toFixed(2);
        } else {
          return roundedUp;
        }
      }

      return total;
    }
  }
};
</script>

<style scoped>
.charity {
  background-color: salmon;
}
</style>
