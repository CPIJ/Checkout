<template>
    <section>
      <div id="video-bg">
       <video id="video" autoplay ref=video>
          Your browser does not support the video tag.
      </video>
      </div>
      <div class="loader-container" v-if="loading">
        <v-progress-circular
          class="loader"
          :size="50"
          color="primary"
          indeterminate
        />
    </div>
    </section>
</template>

<script>
import { mediaConstraints, timeout, snap } from "@/classes/utils";
import { Webcam } from "@/classes/Webcam";

export default {
  name: "camera-preview",
  data() {
    return {
      scanMethod: "product",
      loading: false
    };
  },

  props: ["capture"],

  async mounted() {
    this.$refs.video.srcObject = this.$videoStream.currentStream;
    this.$refs.video.play();
  },

  methods: {
    reload() {
      this.$router.push("/");
    },
    async scanProduct() {
      this.loading = true;

      await timeout(500);

      const image = await this.getImage(416, 416);
      const imageData = Webcam.capture(image);
      const predictions = await this.$productClassifier.predict(imageData);

      this.loading = false;

      if (predictions.length > 0) {
        const product = await this.$productService.getByEan(predictions[0].ean);

        this.$emit("product-classified", product);
        this.scanMethod = "product";
      } else {
        alert("Dit product ken ik nog niet, scan de barcode.");

        this.scanMethod = "barcode";
        await this.scanBarcode();
      }
    },

    async scanBarcode() {
      const barcode = await this.$barcodeScanner.scan();
      const product = await this.$productService.getByEan(barcode);

      if (product) {
        this.$emit("product-classified", product);

        const question = "Wil je mij helpen slimmer te worden?";
        this.scanMethod = confirm(question) ? "new" : "product";
      } else {
        alert("Onbekende barcode, probeer het opnieuw.")
        await this.scanBarcode()
      }
    },

    async scanNewProduct() {
      const image = await this.getImage();
      this.scanMethod = "product";

      this.$router.push({
        name: "set-boundingbox",
        params: { image: image, ean: "0".repeat(13) }
      });
    },

    async doCapture() {
      switch (this.scanMethod) {
        case "product":
          await this.scanProduct();
          break;
        case "barcode":
          await this.scanBarcode();
          break;
        case "new":
          await this.scanNewProduct();
      }

      this.$emit("done");
    },

    async getImage(width, height) {
      const w = this.$refs.video.videoWidth;
      const h = this.$refs.video.videoHeight;
      return await snap(this.$refs.video, width || w, height || h);
    }
  },

  watch: {
    async capture(newValue) {
      if (newValue == true) {
        await this.doCapture();
      }
    },

    scanMethod(newValue) {
      this.$emit("scan-method-changed", newValue);
    }
  }
};
</script>

<style>
.loader {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 100;
  transform: translate(-50%, -50%);
}

.loader-container {
  padding: 3em;
  background-color: rgba(0, 0, 0, 0.5);
  width: 20vw;
  height: auto;
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 100;
  transform: translate(-50%, -50%);
  border-radius: 50%;
}

#video-bg {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
}
#video-bg > video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
/* 1. No object-fit support: */
@media (min-aspect-ratio: 16/9) {
  #video-bg > video {
    height: 300%;
    top: -100%;
  }
}
@media (max-aspect-ratio: 16/9) {
  #video-bg > video {
    width: 300%;
    left: -100%;
  }
}
/* 2. If supporting object-fit, overriding (1): */
@supports (object-fit: cover) {
  #video-bg > video {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
