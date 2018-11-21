<template>
  <v-content>
    <v-container style="width: 70vw;" fill-height>
      <v-layout align-center justify-center column fill-height>
        <img src="@/assets/checkout-logo.svg" alt="">
        <v-progress-linear v-if="loading" style="width:50%" :indeterminate="true"></v-progress-linear>
        <v-btn style="width:50vw; margin-top: 2em;" color="primary" @click="enterFullScreen(); $router.push({ name: 'home' })" v-if="!loading">Begin</v-btn>
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
    };
  },

  methods: {
    enterFullScreen() {
      document.cancelFullScreen =
        document.webkitExitFullscreen ||
        document.mozCancelFullScreen ||
        document.exitFullscreen;

      if (this.elem.webkitRequestFullscreen) {
        this.elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      } else {
        if (this.elem.mozRequestFullScreen) {
          this.elem.mozRequestFullScreen();
        } else {
          this.elem.requestFullscreen();
        }
      }
    }
  },

  computed: {
    elem() {
      return document.getElementById("app");
    }
  }
};
</script>

<style>
</style>
