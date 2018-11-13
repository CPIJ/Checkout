<template>
    <div id="checkout-view">
        <div class="qr-container">
            
            <div class="qr">
                <p v-if="loading">Loading...</p>
                <div v-else>
                    <p>Scan deze code bij de kassa om af te rekenen.</p>    
                    <vue-qr :text="shoppingCartId" :size="vw"></vue-qr>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VueQr from "vue-qr";
import { calculateViewWidth } from "@/classes/utils";

export default {
  components: {
    VueQr
  },

  data() {
    return {
      shoppingCartId: null,
      loading: true
    };
  },

  async mounted() {
      const cart = await this.$productService.getShoppingCart(this.$store.state.userId)
      this.shoppingCartId = cart.id
      this.loading = false
  },

  computed: {
    vw() {
      return calculateViewWidth(60);
    }
  }
};
</script>

<style>
#checkout-view {
  width: 100vw;
  height: 100vh;
}

.qr-container p {
    text-align: center;
    margin-bottom: 7vw;
    font-size: 1.2em;
}

.qr {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
