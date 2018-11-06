<template>
    <div class="product-thumbnail">
        A
    </div>
</template>

<script>
import Product from "@/models/Product";

export default {
  name: "product-thumbnail",
  props: [
    {
      product: Product,
      required: true
    }
  ]
};
</script>

<style>
</style>
