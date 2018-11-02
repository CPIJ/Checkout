<template>
  <div class="home">
    HelloWorld
    <camera-preview></camera-preview>
  </div>
</template>

<script>
// @ is an alias to /src
import CameraPreview from '@/components/CameraPreview.vue';

export default {
  name: 'home',
  components: {
    CameraPreview,
  },
};
</script>
