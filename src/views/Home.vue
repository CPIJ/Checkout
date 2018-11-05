<template>
  <div class="home">
    <camera-preview 
      v-on:product-detected="onProductDetected" 
      v-on:video-ready="resizeCanvas"
    >
      <canvas ref=output>Hi</canvas>
    </camera-preview>
  </div>
</template>

<script>
// @ is an alias to /src
import CameraPreview from "@/components/CameraPreview.vue";

export default {
  name: "home",
  components: {
    CameraPreview
  },

  mounted() {
    this.output = this.$refs.output.getContext('2d')
  },

  methods: {
    onProductDetected(result) {
      const imageData = this.output.createImageData(
        result.width,
        result.height
      );

      const data = imageData.data;

      for (let i = 0; i < result.width * result.height * 4; i++) {
        data[i] = result.pixels[i];
      }

      this.output.putImageData(imageData, 0, 0);
    },

    resizeCanvas(width, height) {
      this.$refs.output.width = width;
      this.$refs.output.height = height;
      this.output = this.$refs.output.getContext("2d");
    }
  }
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  background: black;
}
</style>
