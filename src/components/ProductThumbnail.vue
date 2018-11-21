<template>
  <v-progress-circular :width="6" :size="80" :value="value" color="blue">
    <img :src="product.thumbnail" />
  </v-progress-circular>
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

  data() {
    return {
      value: 100,
      interval: {}
    };
  },

  mounted() {
    this.startTimer();
  },

  methods: {
    startTimer() {
      this.interval = setInterval(() => {
        if (this.value === 0) {
          this.$emit("timeout-elapsed", this.product);
          clearTimeout(this.interval);
        }

        this.value -= 10;
      }, 1000);
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

img {
  height: 10vh;
  border-radius: 50%;
  border-radius: 50%;
}
</style>
