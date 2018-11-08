<template>
  <div class="boundingbox">

    <div id="img-bg">
    <img class="base-image" :src="image.toDataURL()">
    </div>
  </div>
</template>

<script>
export default {
  name: "boundingbox-view",
  components: {},
  mounted() {
    if (this.image === undefined) {
      this.$router.push("/");
    }
  },
  props: {
    image: {
      type: HTMLCanvasElement,
      required: true
    }
  },

  methods: {}
};
</script>

<style scoped>
* {
  color: black;
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
/* 1. No object-fit support: */
@media (min-aspect-ratio: 16/9) {
  #img-bg > img {
    height: 300%;
    top: -100%;
  }
}
@media (max-aspect-ratio: 16/9) {
  #img-bg > img {
    width: 300%;
    left: -100%;
  }
}
/* 2. If supporting object-fit, overriding (1): */
@supports (object-fit: cover) {
  #img-bg > img {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
