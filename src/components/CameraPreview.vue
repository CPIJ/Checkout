<template>
    <section>
      <div class="container">
          <canvas ref=output></canvas>
        </div>
        <video id="video" v-on:canplay="setCanvasDimensions" autoplay ref=video class="hidden">Your browser does not support the video tag.</video>
    </section>
</template>

<script>
import ProductTracker from "@/classes/ProductTracker";

export default {
  name: "camera-preview",

  data() {
    return {
      output: null,
      video: null,
      tracker: new ProductTracker()
    };
  },

  async mounted() {
    this.output = this.$refs.output.getContext("2d");
    this.video = this.$refs.video;

    const stream = await navigator.mediaDevices.getUserMedia(
      this.videoConstraints
    );
    this.video.src = window.URL.createObjectURL(stream);

    tracking.track("#video", this.tracker);

    this.tracker.on("track", result => {
      const imageData = this.output.createImageData(
        result.width,
        result.height
      );
      const data = imageData.data;

      for (let i = 0; i < result.width * result.height * 4; i++) {
        data[i] = result.pixels[i];
      }

      this.output.putImageData(imageData, 0, 0);
    });
  },

  methods: {
    setCanvasDimensions() {
      this.$refs.output.width = this.video.videoWidth;
      this.$refs.output.height = this.video.videoHeight;
      this.output = this.$refs.output.getContext("2d");
    }
  },

  computed: {
    videoConstraints() {
      return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
        ? { video: { facingMode: { exact: "environment" } } }
        : { video: true };
    }
  }
};
</script>

<style>
.hidden {
  opacity: 0;
  height: 100%;
}

.container {
  width: 100vw;
  height: 100vh;
  position: relative;
}

canvas {
  width: 100%;
  height: auto;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
</style>
