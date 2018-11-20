<template>
  <v-content>
    <v-container style="width: 70vw;" fill-height>
      <v-layout align-center justify-center column fill-height>
        <img src="@/assets/checkout-logo.svg" alt="">
        <v-progress-linear v-if="loading" style="width:50%" :indeterminate="true"></v-progress-linear>
        <v-btn @click="enterFullScreen(); $router.push({ name: 'home' })" v-if="!loading">Begin</v-btn>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import { timeout } from "@/classes/utils";

export default {
  async mounted() {
    await this.$productClassifier.init();
    await this.$videoStream.init();

    this.loading = false;
  },

  data() {
    return {
      loading: true
    }
  },

  methods: {
    enterFullScreen() {
      document.cancelFullScreen =
        document.webkitExitFullscreen ||
        document.mozCancelFullScreen ||
        document.exitFullscreen;

      document.getElementById(
        "app"
      ).onwebkitfullscreenchange = this.onFullScreenEnter;
      document.getElementById(
        "app"
      ).onmozfullscreenchange = this.onFullScreenEnter;
      document.getElementById(
        "app"
      ).onfullscreenchange = this.onFullScreenEnter;
      if (document.getElementById("app").webkitRequestFullscreen) {
        document
          .getElementById("app")
          .webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      } else {
        if (document.getElementById("app").mozRequestFullScreen) {
          document.getElementById("app").mozRequestFullScreen();
        } else {
          document.getElementById("app").requestFullscreen();
        }
      }
    },
    onFullScreenEnter() {
      console.log("Entered fullscreen!");
      elem.onwebkitfullscreenchange = () => console.log("exit");
      elem.onmozfullscreenchange = () => console.log("exit");
    }
  }
};
</script>

<style>
</style>
