<template>
  <v-content>
    <v-btn @click="$router.push({ name: 'home' })" style="left: 5%; bottom: 2.5%;" fixed fab><v-icon>arrow_back</v-icon></v-btn>
    <v-btn @click="goToShoppingCart" style="right: 5%; bottom: 2.5%;" fixed fab><v-icon>shopping_cart</v-icon></v-btn>
    <camera-preview @product-classified="onProductClassified"/>
    <div class="thumbnails">
      <product-thumbnail
        class="thumbnail"
        v-for="product of productThumbnails"
        :key="product.ean"
        :cancel="cancel"
        v-on:timeout-elapsed="addProduct"
        :product="product"
      />
    </div>
  </v-content>
</template>

<script>
import Product from "@/models/Product.js";
import CameraPreview from "@/components/CameraPreview.vue";
import ProductThumbnail from "@/components/ProductThumbnail.vue";
import ProductService from "@/services/ProductService";

export default {
  name: "shop-view",
  components: {
    CameraPreview,
    ProductThumbnail
  },

  mounted() {
    if (!this.$dependenciesLoaded()) {
      this.$router.push("/");
    }
  },

  data() {
    return {
      productThumbnails: [],
      cancel: true
    };
  },

  methods: {
    onProductClassified(product) {
      this.productThumbnails.push(product);
    },

    async addProduct(product) {
      await this.$productService.addToShoppingCart(
        product,
        this.$store.state.userId
      );
      this.productThumbnails = this.productThumbnails.filter(
        p => p.ean !== product.ean
      );
    },

    async goToShoppingCart() {
      this.cancel = true;
      const list = this.productThumbnails.slice();

      for (let product of list) {
        await this.addProduct(product)
      }

      this.$router.push({ name: 'shopping-cart' })
    }
  }
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

.thumbnails {
  width: 100%;
  height: 10vh;
  position: relative;
}
</style>
