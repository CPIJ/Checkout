<template>
    <div id="home-view">
        <router-link tag="button" to="/shop">Winkel</router-link>
        <router-link tag="button" to="/checkout">Afrekenen</router-link>
        <router-link tag="button" to="/">Addons</router-link>
        <hr>
        <router-link v-if="admin" tag="button" to="/cash-register">Kassa</router-link>
        <router-link v-if="admin" tag="button" to="/trained-images">Train afbeeldingen</router-link>
    </div>
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
#home-view {
  display: flex;
  align-items: center;
  flex-direction: column;
  vertical-align: middle;
}
</style>
