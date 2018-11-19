<template>
    <div class="product-thumbnail">
        <img :src="product.thumbnail">
    </div>
</template>

<script>
import { timeout } from "@/classes/utils";
import Product from "@/models/Product";

export default {
  name: "product-thumbnail",
  props: {
    product: {
      type: Product,
      required: true
    },
    timeout: {
      type: Number,
      required: false,
      default: 5000
    },
    cancel: {
      type: Boolean,
      required: true
    }
  },

  mounted() {
    this.startTimer();
  },

  methods: {
    async startTimer() {
      if (this.timeout != -1) {
        
        await timeout(this.timeout);

        if (!this.cancel) {
          this.$emit("timeout-elapsed", this.product);
        }
      }
    }
  }
};
</script>

<style scoped>
.product-thumbnail {
  width: 33%;
  height: 100%;
  padding-top: 2vh;
  text-align: center;
  float: left;
}

.product-thumbnail img {
  height: 100%;
  border-radius: 50%;
  border: 4px solid steelblue;
  border-radius: 50%;
}
</style>
