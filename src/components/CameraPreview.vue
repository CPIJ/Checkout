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
import smartcrop from "smartcrop";
import { mediaConstraints, timeout } from "@/classes/utils";
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

        if (!product.isAvailableInPhs) {
          const wantsToHelp = confirm(
            "Dit product is nieuw voor mij, wil je mij helpen slimmer te worden?"
          );

          if (wantsToHelp) {
            this.scanMethod = "new";
            this.$emit("product-classified", product);
          } else {
            this.scanMethod = "product";
            this.$emit("product-classified", product);
          }
        } else {
          this.$emit("product-classified", product);
          this.scanMethod = "product";
        }
      } else {
        alert("Dit product ken ik nog niet, wil je de barcode scannen?");

        this.scanMethod = "barcode";

        await this.scanBarcode();
      }
    },

    async scanBarcode() {
      const image = await this.getImage();
      const barcode = await this.$barcodeScanner.scan();

      if (barcode) {
        const product = await this.$productService.getByEan(barcode);

        if (!product) {
          alert("Ongeldige barcode, scan iets anders.");

          this.scanMethod = "product";
          return;
        }

        if (!product.isAvailableInPhs) {
          const wantsToHelp = confirm(
            "Dit product is nieuw voor mij, wil je mij helpen slimmer te worden?"
          );

          if (wantsToHelp) {
            this.scanMethod = "new";
          } else {
            this.scanMethod = "product";
            this.$emit("product-classified", product);
          }
        } else {
          this.$emit("product-classified", product);
          this.scanMethod = "product";
        }
      } else {
        alert(
          "Sorry, deze barcode kon ik niet goed zien. Wil je het nog eens proberen?"
        );
        this.scanMethod = "barcode";
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
      return await this.snap(this.$refs.video, width || w, height || h);
    },

    async snap(source, width, height) {
      var canvas = document.createElement("canvas");
      canvas.height = source.videoHeight;
      canvas.width = source.videoWidth;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(source, 0, 0, canvas.width, canvas.height);

      const { topCrop } = await smartcrop.crop(canvas, {
        width: width,
        height: height
      });

      const tnCanvas = document.createElement("canvas");
      const tnContext = tnCanvas.getContext("2d");
      tnCanvas.width = width;
      tnCanvas.height = height;

      var bufferCanvas = document.createElement("canvas");
      var bufferContext = bufferCanvas.getContext("2d");
      bufferCanvas.width = source.videoWidth;
      bufferCanvas.height = source.videoHeight;
      bufferContext.drawImage(source, 0, 0);

      tnContext.drawImage(
        bufferCanvas,
        topCrop.x,
        topCrop.y,
        width,
        height,
        0,
        0,
        width,
        height
      );
      return tnCanvas;
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

.reset {
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
}

.circle {
  width: 15vw;
  height: 15vw;
  border-radius: 50%;
  position: absolute;
  display: block;
}

#capture.product-active {
  background-color: #ef5350;
}

#capture.barcode-active {
  display: none;
}

#capture.new-active {
  background-color: orange;
}

#capture {
  position: absolute;
  bottom: 2.5%;
  left: 50%;
  border: 4px solid #f5f5f5;
  background-color: #ef5350;
  transform: translate(-50%);
}

#capture:active {
  background: #d32f2f !important;
  border: 4px solid white;
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
