<template>
  <div class="boundingbox">
    <div id="img-bg">
      <img class="base-image" :src="image.toDataURL()">
    </div>
    <canvas ref="output" id="output"></canvas>
    <bounding-box-selector :show="!isSnapping"></bounding-box-selector>
    <button v-if="!isSnapping" id="snap" @click="snap">SNAP</button>
    <Alert
      :show="showThanksAlert"
      :body="'Bedankt voor uw hulp!'"
      @ok="showThanksAlert = false; $router.go(-1)"
    />
  </div>
</template>

<script>
import BoundingBoxSelector from "@/components/BoundingBoxSelector";
import { generateCombination } from "gfycat-style-urls";
import { timeout } from "@/classes/utils";
import html2canvas from "html2canvas";
import Alert from "@/components/Alert";

export default {
  name: "boundingbox-view",
  components: {
    BoundingBoxSelector,
    Alert
  },
  props: {
    image: {
      type: HTMLCanvasElement,
      required: true
    },
    ean: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      isSnapping: false,
      showThanksAlert: false
    };
  },

  mounted() {
    if (this.image === undefined) {
      this.$router.push("/");
    }
  },

  methods: {
    async snap() {
      this.isSnapping = true;

      await timeout(500);

      const outputCanvas = await html2canvas(document.body, {
        scale: 1,
        width: window.innerWidth,
        height: window.innerHeight
      });
      const uri = outputCanvas.toDataURL("image/jpeg");

      this.isSnapping = false;

      await this.$imageService.saveImage({
        value: uri
      });

      this.showThanksAlert = true;
    }
  }
};
</script>

<style scoped>
* {
  color: black;
}

#snap {
  position: absolute;
  bottom: 5%;
  left: 0;
}

#output {
  position: absolute;
  top: 0;
  left: 0;
}

#img-bg {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
}
#img-bg > img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* @media (min-aspect-ratio: 16/9) {
  #img-bg > img {
    height: 300%;
    top: -100%;
  }
}
@media (max-aspect-ratio: 16/9) {
  #img-bg > img {
    width: 300%;
    left: -100%;
  }
}

@supports (object-fit: cover) {
  #img-bg > img {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  } */
/* } */
</style>
