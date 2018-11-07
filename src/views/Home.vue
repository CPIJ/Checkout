<template>
  <div class="home">
    <camera-preview @product-classified="onProductClassified"/>
    <product-thumbnail
      class="thumbnail"
      v-for="product of productThumbnails"
      :key="product.ean"
      v-on:timeout-elapsed="addProduct"
      :product="product"
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
      productThumbnails: []
    };
  },

  methods: {
    onProductClassified(product) {
      this.productThumbnails.push(product);
    },
    addProduct(product) {
      console.log("Add product", product);
      this.productThumbnails = this.productThumbnails.filter(p => p.ean !== product.ean)
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

.thumbnail {
  position: absolute;
  z-index: 1;
}
</style>
