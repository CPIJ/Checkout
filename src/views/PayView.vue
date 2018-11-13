<template>
    <div id="pay-view">
      <table v-if="!loading">
        <tr>
          <td>Naam</td>
          <td>Aantal</td>
          <td>Prijs</td>
        </tr>
        <tr v-for="product of shoppingCart.items" :key="product.name">
          <td>{{product.name}}</td>
          <td style="text-align: center;">
              {{product.amount}} 
          </td>
          <td>€{{(product.price * product.amount).toFixed(2)}}</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td><b>€{{shoppingCart.items.reduce((acc, curr) => (acc += curr.price * curr.amount), 0).toFixed(2)}}</b></td>
          <td></td>
        </tr>
    </table>
        <button @click="pay">{{paymentInProgess ? 'Betaling wordt verwerkt...' : 'Betaal'}}</button>
    </div>
</template>

<script>
import { timeout } from "@/classes/utils";

export default {
  props: {
    userId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      shoppingCart: null,
      loading: true,
      paymentInProgess: false
    };
  },
  async mounted() {
    this.shoppingCart = await this.$productService.getShoppingCart(this.userId);
    this.loading = false;
  },
  methods: {
    async pay() {
      this.paymentInProgess = true;

      const payementSuccesful = await this.$productService.payShoppingCart(
        this.shoppingCart.id
      );

      if (payementSuccesful) {
        alert("Uw betaling is gelukt!");
        await this.$productService.createNewCartFor(this.userId);
        this.$router.push({ name: "cash-register" });
      } else {
        alert(
          "Erg ging iets fout tijdens de betaling, probeer het opnieuw a.u.b."
        );
      }

      this.paymentInProgess = false;
    }
  }
};
</script>

<style>
</style>
