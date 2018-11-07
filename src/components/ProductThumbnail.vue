<template>
    <div class="product-thumbnail">
        A
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
    }
  },

  mounted() {
    this.startTimer()
  },

  methods: {
    async startTimer() {
      await timeout(this.timeout);
      this.$emit("timeout-elapsed", this.product);
    }
  }
};
</script>

<style>
</style>
