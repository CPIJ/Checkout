<template>
    <div id="trained-images-view">
        <div class="gallery" v-for="image of images" :key="image.imageUri">
            <a :href="image.imageUri">
                <img :src="image.uri" width="300" height="200">
            </a>
        </div>
    </div>
</template>

<script>
export default {
  async mounted() {
    const response = await this.$imageService.getAllImages();
    this.images = await response.json();
  },

  data() {
    return {
      images: []
    };
  }
};
</script>

<style scoped>
div.gallery {
  margin: 5px;
  border: 1px solid #ccc;
  float: left;
  width: 180px;
}

div.gallery:hover {
  border: 1px solid #777;
}

div.gallery img {
  width: 100%;
  height: auto;
}

div.desc {
  padding: 15px;
  text-align: center;
}
</style>
