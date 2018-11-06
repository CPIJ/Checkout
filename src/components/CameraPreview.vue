<template>
    <section>
      <div class="container">
        <div class="camera-preview">
          <video 
            id="video" 
            autoplay
            ref=video>
              Your browser does not support the video tag.
            </video>
            <button @click="capture" class="reset circle" id="capture"></button>
            <button class="reset circle" id="shopping-cart"><i class="fas fa-list"></i></button>
          </div>
      </div>
    </section>
</template>

<script>
import ProductClassifier from '@/classes/ProductClassifier'
import { mediaConstraints } from '@/classes/utils'

export default {
  name: "camera-preview",

  data() {
    return {
      classifier: new ProductClassifier()
    };
  },

  async mounted() {
    const stream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
    this.$refs.video.srcObject = stream;
    this.$refs.video.play();
  },

  methods: {
    async capture() {
      const predictions = await this.classifier.predict(this.getImage())
      console.log(predictions)
    },

    getImage() {

    }
  }
};
</script>

<style>
.container {
  background-color: black;
  height: 100vh;
  width: 100vw;
  position: relative;
}

.camera-preview {
  height: 80%;
  width: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: black;
}

.reset {
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
}

.circle {
  width: 15vw;
  height: 15vw;
  border-radius: 50%;
  position: absolute;
  display: block;
}

#capture {
  bottom: 0%;
  left: calc(50vw - (18vw / 2));
  background: salmon;
  border: 4px solid lightgrey;
}

#capture:active {
  background: red;
  border: 4px solid white;
}

#shopping-cart {
  left: 2.5%;
  bottom: 0%;
  background: white;
  font-size: 1em;
  color: gray;
}

video {
  width: 100%;
  height: auto;
  max-height: 100%;
  max-width: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
</style>
