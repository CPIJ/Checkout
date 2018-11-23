<template>
  <v-content>
    <v-btn @click="goHome" style="left: 5%; bottom: 2.5%;" fixed fab><v-icon>arrow_back</v-icon></v-btn>
    <v-btn v-if="!barcodeActive"  @click="capture = true;" fab fixed id="capture"></v-btn>
    <v-btn @click="goToShoppingCart" style="right: 5%; bottom: 2.5%;" fixed fab><v-icon>shopping_cart</v-icon></v-btn>

    <v-snackbar v-model="snackbar" :top="true" :timeout="10000">
      {{infoText}}
    </v-snackbar>

    <camera-preview 
      :capture="capture" 
      @done="capture = false" 
      @product-classified="onProductClassified"
      @scan-method-changed="onScanMethodChanged"
    />
    
    <div v-if="barcodeActive" class="barcode-scanner">
      <div id="line"></div>
    </div>

    <div class="thumbnails">
      <product-thumbnail
        class="thumbnail"
        v-for="(product, index) of productThumbnails"
        :key="product.ean"
        :cancel="cancel"
        :index="index"
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
      cancel: false,
      capture: false,
      snackbar: false,
      barcodeActive: false,
      infoText: "",
      productsClassified: 0
    };
  },

  methods: {
    async onProductClassified(product) {
      if (this.productThumbnails.length >= 3) {
        const first = this.productThumbnails.shift();
        await this.addProduct(first);
      }

      this.productThumbnails.push(product);

      this.productsClassified++;
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

    async goHome() {
      this.cancel = true;

      await this.addAllProducts();

      this.$router.push({ name: "home" });
    },

    async goToShoppingCart() {
      this.cancel = true;

      await this.addAllProducts();

      this.$router.push({ name: "shopping-cart" });
    },

    async addAllProducts() {
      const list = this.productThumbnails.slice();

      for (let product of list) {
        await this.addProduct(product);
      }
    },

    onScanMethodChanged(newMethod) {
      this.barcodeActive = false;

      switch (newMethod) {
        case "product":
          this.snackbar = false;
          break;
        case "barcode":
          this.infoText = "De barcode scanner is actief.";
          this.barcodeActive = true;
          this.snackbar = true;
          break;
        case "new":
          this.infoText = "Maak een foto van het product.";
          this.snackbar = true;
          break;
      }
    }
  },

  watch: {
    async productsClassified(newValue) {
      if (newValue == 3 && Math.random() > 0.5) {
        const wantsUpsale = confirm(
          "we hebben een speciaale aanbieding voor jou, Nu één citroen voor maar €0,30! Klik op OK om te kopen."
        );

        if (wantsUpsale) {
          const product = await this.$productService.getByEan("2978742257496");
          this.onProductClassified(product);
        }
      }
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

#capture {
  border: 4px solid #f5f5f5;
  background-color: #ef5350;
  right: 42vw;
  bottom: 2.5%;
}

.barcode-scanner {
  width: 80vw;
  height: 45vw;
  /* border: 2px solid #1e88e5; */
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

#line {
  height: 100%;
  width: 4px;
  background-color: #ef5350;
  -webkit-animation: ease-in-out infinite alternate;
  -webkit-animation-name: run;
  -webkit-animation-duration: 3s;
  position: absolute;
}

@-webkit-keyframes run {
  0% {
    left: 0;
  }
  50% {
    left: 100%;
  }
  100% {
    left: 0;
  }
}
</style>
