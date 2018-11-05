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
    this.output = this.$refs.output.getContext("2d");
  },

  methods: {
    onProductDetected(result) {
      this.output.putImageData(result.image, 0, 0, 0, 0, result.width, result.height);
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
