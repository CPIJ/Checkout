<template>
    <section>
      <div id="video-bg">
       <video id="video" autoplay ref=video>
          Your browser does not support the video tag.
      </video>
      </div>
      <button @click="capture" class="reset circle" id="capture"></button>
      <button class="reset circle" id="shopping-cart"><i class="fas fa-list"></i></button>
    </section>
</template>

<script>
import ProductClassifier from "@/classes/ProductClassifier";
import ProductService from "@/services/ProductService";
import smartcrop from "smartcrop";
import { mediaConstraints } from "@/classes/utils";
import { Webcam } from "@/classes/Webcam";

export default {
  name: "camera-preview",

  data() {
    return {
      classifier: new ProductClassifier(),
      productService: new ProductService()
    };
  },

  async mounted() {
    await this.classifier.init();
    const stream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
    this.$refs.video.srcObject = stream;
    this.$refs.video.play();
  },

  methods: {
    async capture() {
      const image = await this.getImage();
      const predictions = await this.classifier.predict(image);

      if (predictions.length > 0) {
        const product = this.productService.getByEan(predictions[0].ean);
        this.$emit("product-classified", product);
      }
    },

    async getImage() {
      const image = await this.snap(this.$refs.video, 416, 416);
      return Webcam.capture(image);
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

#capture {
  bottom: 2.5%;
  left: calc(50vw - (18vw / 2));
  background: salmon;
  border: 4px solid lightgrey;
}

#capture:active {
  background: red;
  border: 4px solid white;
}

#shopping-cart {
  left: 2.5%;
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
