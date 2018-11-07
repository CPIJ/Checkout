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
    }
  },
  
  mounted() {
    this.startTimer()
  },

  methods: {
    async startTimer() {
      await timeout(5000);
      this.$emit("timeout-elapsed", this.pr);
    }
  }
};
</script>

<style>
</style>
