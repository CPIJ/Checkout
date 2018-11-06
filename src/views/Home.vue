<template>
  <div class="home">
    <product-thumbnail
      v-for="product of products"
      :key="product.ean"
      v-on:timeout-elapsed="addProduct"
    />
    <camera-preview
      @product-classified="onProductClassified"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import CameraPreview from "@/components/CameraPreview.vue";
import ProductThumbnail from "@/components/ProductThumbnail.vue";

export default {
  name: "home",
  components: {
    CameraPreview,
    ProductThumbnail
  },

  data() {
    return {
      products: []
    };
  },

  methods: {
    onProductClassified(product) {
      this.products.push(product)
    },
    addProduct(product) {
      console.log('Add product', product)
    }
  }
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  background: black;
  color: white;
}

.home {
}
</style>
