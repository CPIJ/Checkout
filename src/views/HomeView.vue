<template>
  <v-content>
    <v-container fluid>
      <v-toolbar color="primary" dark app>
        <v-toolbar-side-icon><v-icon>home</v-icon></v-toolbar-side-icon>
        <v-toolbar-title>Checkout</v-toolbar-title>
      </v-toolbar>
      <v-layout class="btn-container" align-center column>
        <v-btn block to="/shop" color="primary">Winkel</v-btn>
        <v-btn block to="/shopping-cart" color="primary">Winkelwagen</v-btn>
        <v-btn block to="/checkout" color="primary">Afrekenen</v-btn>
        <v-btn block to="/" color="primary">Addons</v-btn>
        <v-btn block to="/cash-register" v-if="admin" color="secondary">Kassa</v-btn>
        <v-btn block to="/trained-images" v-if="admin" color="secondary">Afbeeldingen</v-btn>
        <img style="position: fixed; bottom: 2%; width: 35vw;" src="@/assets/checkout-logo.svg" alt="">
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  data() {
    return {
      key: "",
      admin: false
    };
  },

  mounted() {
    window.addEventListener("keydown", e => (this.key += e.key));
  },

  watch: {
    key(newVal) {
      this.admin = newVal === "admin";
    }
  }
};
</script>

<style>

</style>
