<template>
    <section>
      <div class="container">
          <slot></slot>
        </div>
        <video 
          id="video" 
          v-on:canplay="canplay" 
          autoplay 
          ref=video 
          class="hidden">
            Your browser does not support the video tag.
          </video>
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
    this.video = this.$refs.video;
    await this.startVideo();
    this.startTracking();
  },

  methods: {
    async startVideo() {
      const stream = await navigator.mediaDevices.getUserMedia(
        this.videoConstraints
      );

      this.video.srcObject = stream;
    },

    async startTracking() {
      tracking.track("#video", this.tracker);

      this.tracker.on("track", result => {
        this.$emit("product-detected", result);
      });
    },

    canplay() {
      this.$emit("video-ready", this.video.videoWidth, this.video.videoHeight);
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
