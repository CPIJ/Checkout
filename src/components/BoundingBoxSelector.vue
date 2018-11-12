<template>
    <div id="boudning-box-selector">
        <div style="position: absolute">
        <div
            :style="{'width': `${vw}vw`, 'padding-bottom': `${vw}vw`}"
            :x1="i % cols" 
            :y1="0"
            :x2="(i % cols) * size" 
            :y2="100"  
            :id="`square-${i}`" @click="addSquare(i)" 
            v-for="(_, i) in amount" 
            :key="i" class="square border">
        </div>
        </div>
    </div>
</template>

<script>
import { calculateViewWidth } from "@/classes/utils";

export default {
  name: "bounding-box-selector",
  data() {
    return {
      cols: 5,
      vw: 19.4
    };
  },

  methods: {
    addSquare(index) {
      const element = document.getElementById(`square-${index}`);

      if (element.classList.contains("selected")) {
        element.classList.remove("selected");
      } else {
        element.classList.add("selected");
      }
    }
  },

  props: {
    show: { type: Boolean, required: true }
  },

  computed: {
    amount() {
      return this.rows * this.cols;
    },

    rows() {
      return 9;
    },

    size() {
      return calculateViewWidth(this.vw);
    }
  },

  watch: {
    show(shouldShow) {
      const elements = document.getElementsByClassName("square");

      for (let element of elements) {
        if (shouldShow) {
          element.classList.add("border");
        } else {
          element.classList.remove("border");
        }
      }
    }
  }
};
</script>

<style scoped>
#boudning-box-selector {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.square {
  float: left;
  position: relative;
  border: 1px solid transparent;
}

.border {
  border: 1px solid #008df7;
}

.square.selected {
  background-color: rgba(0, 141, 247, 0.5);
}
</style>
