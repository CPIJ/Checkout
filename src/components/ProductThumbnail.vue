<template>
  <v-progress-circular :width="7" :size="70" :style="{left: 7 + index * 33 + '%', top: '20px', position: 'absolute'}" :value="value" color="blue">
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
    },
    index: {
      type: Number,
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
img {
  margin-top: 5px;
  height: 10vh;
  border-radius: 50%;
  border-radius: 50%;
  -webkit-box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
}
</style>
