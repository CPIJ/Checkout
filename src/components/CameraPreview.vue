<template>
    <section>
      <div class="canvas-container">
        <p v-for="box of boxes">{{box.className}}</p>
          <slot></slot>
        </div>
        <video 
          id="video" 
          autoplay
          width="416" height="416" 
          ref=video 
          class="hidden">
            Your browser does not support the video tag.
          </video>
        
    </section>
</template>

<script>
import * as tf from "@tensorflow/tfjs";
import yolo, { downloadModel } from "tfjs-yolo-tiny";
import { Webcam } from "@/classes/Webcam";

export default {
  name: "camera-preview",

  data() {
    return {
      output: null,
      video: null,
      boxes: []
    };
  },

  async mounted() {
    this.video = this.$refs.video;
    this.camera = new Webcam(this.video);
    await this.camera.setup();
    this.model = await downloadModel();
    this.run();
  },

  methods: {
    async run() {
      while (true) {
        const image = this.camera.capture();

        this.boxes = await yolo(image, this.model);

        image.dispose();

        await tf.nextFrame();
      }
    },

    clearRects() {
      const rects = document.getElementsByClassName("rect");
      while (rects[0]) {
        rects[0].parentNode.removeChild(rects[0]);
      }
    },

    drawRect(x, y, w, h, text = "", color = "red") {
      const rect = document.createElement("div");
      rect.classList.add("rect");
      rect.style.cssText = `top: ${y}; left: ${x}; width: ${w}; height: ${h}; border-color: ${color}`;

      const label = document.createElement("div");
      label.classList.add("label");
      label.innerText = text;
      rect.appendChild(label);

      this.video.appendChild(rect);
    }
  }
};
</script>

<style>
.canvas-container {
  width: 100vw;
  height: 100vh;
  position: relative;
}

video {
  width: 100%;
  height: auto;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

tml, body {
  width: 100%;
  height: 100%;
  margin: 0;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
.wrapper {
  width: 100%;
  min-width: 500px;
}
.logo-wrapper {
  margin: 0 auto 25px auto;
  text-align: center;
}
.logo {
  max-height: 90px;
}
#webcam-wrapper {
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  margin: 0 auto;
  width: 416px;
  height: 416px;
  position: relative;
  display: flex;
  justify-content: center;
  overflow: hidden;
}
.rect {
  position: absolute;
  border: 1px solid red;
  font-size: 24px;
}
.rect .label {
  background: white;
  color: black;
  display: inline;
  opacity: 0.8;
  font-size: 12px;
  padding: 3px;
  text-transform: capitalize;
  white-space: nowrap;
}

.intro {
  max-width: 908px;
  margin: 0 auto;
  padding: 15px;
}
.intro h1 {
  font-weight: 300;
  font-weight: 2rem;
}
.intro p {
  font-weight: 300;
  font-size: 20px;
  line-height: 1.4;
}

#error-message {
  text-align: center;
  margin: 25px 0;
}
#success-message {
  text-align: center;
  max-width: 450px;
  margin: 25px auto;
  color: #00c13f;
  line-height: 1.5;
}
#loading-message {
  text-align: center;
}
.spin {
  width: 120px;
  height: 120px;
  -webkit-animation:spin 2s linear infinite;
  -moz-animation:spin 2s linear infinite;
  animation:spin 2s linear infinite;
}
@-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
@-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
@keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
</style>
