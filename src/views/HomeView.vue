<template>
    <div id="home-view">
      <div id="buttons">
          <router-link tag="button" to="/shop">Winkel</router-link>
          <router-link tag="button" to="/checkout">Afrekenen</router-link>
          <router-link tag="button" to="/">Addons</router-link>
          <router-link v-if="admin" tag="button" to="/cash-register">Kassa</router-link>
          <router-link v-if="admin" tag="button" to="/trained-images">Afbeeldingen</router-link>
        </div>
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
}

#home-view button {
  width: 50vw;
  font-size: 1em;
  margin: 0.3em;
  padding: 0.5em;
}

#buttons {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

button {
  border: none;
  margin: 0;
  padding: 0;
  width: auto;
  overflow: visible;
}
</style>
