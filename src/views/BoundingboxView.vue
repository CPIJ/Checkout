<template>
  <div class="boundingbox">
    <div id="img-bg">
      <img class="base-image" :src="image.toDataURL()">
    </div>
    <div style="position: absolute">
        <div 
        :style="{'width': `${vw}vw`, 'padding-bottom': `${vw}vw`}"
          :x1="(i % rows) * size" 
          :y1="((i - i % rows) / rows) * size"
          :x2="((i % rows) * size) + size" 
          :y2="(((i - i % rows) / rows) * size) + size"  
          :id="`square-${i}`" @click="addSquare(i)" 
          v-for="(_, i) in amount" 
          :key="i" class="square"></div>
  </div>
  </div>
</template>

<script>
import { calculateViewWidth } from "@/classes/utils";

export default {
  name: "boundingbox-view",
  components: {},
  mounted() {
    if (this.image === undefined) {
      this.$router.push("/");
    }
  },

  data() {
    return {
      cols: 5,
      selectedCoordinates: [],
      vw: 24.3
    };
  },

  computed: {
    amount() {
      return this.rows * this.cols;
    },

    rows() {
      const height = window.innerWidth * 0.972;
      return Math.ceil(height / this.size);
    },

    size() {
      return calculateViewWidth(this.vw);
    }
  },

  props: {
    image: {
      type: HTMLCanvasElement,
      required: true
    }
  },

  methods: {
    addSquare(index) {
      const element = document.getElementById(`square-${index}`);

      if (element.classList.contains("selected")) {
        element.classList.remove("selected");
      } else {
        element.classList.add("selected");
      }

      console.log(element);
    },

    getX(index) {
      const n = index % this.rows;
      return n * this.size;
    },

    getY(index) {
      const n = index / this.rows;
      return n * this.size;
    }
  }
};
</script>

<style scoped>
* {
  color: black;
}

.square {
  float: left;
  position: relative;
  width: 25vw;
  padding-bottom: 25vw; /* = width for a 1:1 aspect ratio */
  border: 1px solid blue;
}

.square.selected {
  background-color: rgba(0, 0, 255, 0.5);
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
