<template>
  <div class="boundingbox">
    <div id="img-bg">
      <img class="base-image" :src="image.toDataURL()">
    </div>
    <canvas ref="output" id="output"></canvas>
    <bounding-box-selector :show="!isSnapping"></bounding-box-selector>
    <v-btn :loading="loading" color="primary" v-if="!isSnapping" @click="snap" id="snap">Verstuur</v-btn>
        <v-snackbar v-model="snackbar" :top="true" :timeout="10000">
      Selecteer alle vakken waarin het product zich bevindt.
      <v-btn color="pink" flat @click="snackbar = false">Sluit</v-btn>
    </v-snackbar>

  </div>
</template>

<script>
import BoundingBoxSelector from "@/components/BoundingBoxSelector";
import { generateCombination } from "gfycat-style-urls";
import { timeout } from "@/classes/utils";
import html2canvas from "html2canvas";

export default {
  name: "boundingbox-view",
  components: {
    BoundingBoxSelector
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
      loading: false,
      snackbar: true
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
      this.loading = true;

      await timeout(500);

      const outputCanvas = await html2canvas(document.body, {
        scale: 1,
        width: window.innerWidth,
        height: window.innerHeight
      });
      const uri = outputCanvas.toDataURL("image/jpeg");

      this.isSnapping = false;

      await this.$imageService.saveImage({ value: uri });

      alert("Bedankt voor uw hulp! u wordt teruggestuurd naar de winkel...");

      this.loading = false;

      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
#snap {
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translate(-50%, -50%);
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
</style>
