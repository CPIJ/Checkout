<template>
  <div class="home">
    <camera-preview @product-classified="onProductClassified"/>
    <div class="thumbnails">
      <product-thumbnail
        class="thumbnail"
        v-for="product of productThumbnails"
        :key="product.ean"
        v-on:timeout-elapsed="addProduct"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
import Product from "@/models/Product.js"
import CameraPreview from "@/components/CameraPreview.vue";
import ProductThumbnail from "@/components/ProductThumbnail.vue";

export default {
  name: "shop-view",
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
  color: white;
}

.thumbnails {
  width: 100%;
  height: 10vh;
  position: relative;
}
</style>