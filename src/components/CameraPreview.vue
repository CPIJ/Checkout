<template>
    <section>
      <div id="video-bg">
       <video id="video" autoplay ref=video>
          Your browser does not support the video tag.
      </video>
      </div>
      <button :class="[scanMethod + '-active']" @click="capture" class="reset circle" id="capture"></button>
      <button @click="$router.push('/')"  class="reset circle" id="settings"><fa icon="cog"></fa></button>
      <button @click="$router.push('/shopping-cart')"  class="reset circle" id="shopping-cart"><fa icon="shopping-cart"></fa></button>
    </section>
</template>

<script>
import ProductClassifier from "@/classes/ProductClassifier";
import smartcrop from "smartcrop";
import { mediaConstraints } from "@/classes/utils";
import { Webcam } from "@/classes/Webcam";

export default {
  name: "camera-preview",

  data() {
    return {
      classifier: new ProductClassifier(),
      scanMethod: "product"
    };
  },

  async mounted() {
    await this.classifier.init();
    const stream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
    this.$refs.video.srcObject = stream;
    this.$refs.video.play();
  },

  methods: {
    async scanProduct() {
      const image = await this.getImage(416, 416);
      const imageData = Webcam.capture(image);
      const predictions = await this.classifier.predict(imageData);

      if (predictions.length > 0) {
        const product = await this.$productService.getByEan(predictions[0].ean);

        this.$emit("product-classified", product);
      } else {
        alert("Dit product ken ik nog niet, wil je de barcode scannen?");
        this.scanMethod = "barcode";
        this.scanBarcode();
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

    async capture() {
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
  }
};
</script>

<style>
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
  background-color: salmon;
}

#capture.barcode-active {
  display: none;
}

#capture.new-active {
  background-color: orange;
}

#capture {
  bottom: 2.5%;
  left: calc(50vw - (18vw / 2));
  border: 4px solid lightgrey;
}

#capture:active {
  background: red;
  border: 4px solid white;
}

#settings {
  left: 5%;
  bottom: 2.5%;
  background: white;
  font-size: 1em;
  color: gray;
}

#shopping-cart {
  right: 5%;
  bottom: 2.5%;
  background: white;
  font-size: 1em;
  color: gray;
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
