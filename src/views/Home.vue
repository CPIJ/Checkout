<template>
  <div class="home">
    <camera-preview>
    </camera-preview>
  </div>
</template>

<script>
// @ is an alias to /src
import CameraPreview from "@/components/CameraPreview.vue";

export default {
  name: "home",
  components: {
    CameraPreview
  },

  methods: {}
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  background: black;
  color: white;
}
</style>
