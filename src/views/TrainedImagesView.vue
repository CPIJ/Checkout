<template>
 <v-content>
  <v-toolbar dense dark color="primary">
    <v-toolbar-title>Nieuwe producten verwerken...</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-progress-linear slot="extension" :value="value" color="blue lighten-1"></v-progress-linear>
  </v-toolbar>
  <v-container grid-list-lg>
    <v-layout row wrap fill->
      <v-flex
        v-for="image of images"
        :key="image.id"
        md2
        d-flex
      >
        <v-card tile class="d-flex">
          <v-img
            :src="image.uri"
            :lazy-src="image.uri"
            aspect-ratio="1"
            class="grey lighten-2"
          >
            <v-layout
              slot="placeholder"
              fill-height
              align-center
              justify-center
              ma-0
            >
              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </v-layout>
          </v-img>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
 </v-content>
</template>

<script>
import { randomIntBetween } from '@/classes/utils'

export default {
  async mounted() {
    const response = await this.$imageService.getAllImages();
    this.images = await response.json();

    this.interval = setInterval(() => {
      this.value++
    }, 1000);
  },

  data() {
    return {
      images: [],
      value: 0
    };
  },
};
</script>

<style scoped>
</style>
