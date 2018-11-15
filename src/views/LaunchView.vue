<template>
  <v-content>
    <v-container style="width: 70vw;" fill-height>
      <v-layout align-center justify-center column fill-height>
        <img src="@/assets/checkout-logo.svg" alt="">
        <v-progress-linear style="width:50%" :indeterminate="true"></v-progress-linear>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import { timeout } from '@/classes/utils'

export default {
  async mounted() {
    await this.$productClassifier.init();
    await this.$videoStream.init();
    await timeout(1000)
    this.$router.push({ name: "home" });
  }
};
</script>

<style>
</style>
