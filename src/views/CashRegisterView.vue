<template>
  <v-content>
    <v-container fluid fill-height>
      <v-toolbar color="primary" dark app>
        <v-toolbar-title>Kassa</v-toolbar-title>
      </v-toolbar>
      <v-layout align-center justify-center column fill-height>
        <p class="text-overlay title">Scan je code om af te rekenen.</p>
        <div id="video-bg">
          <qrcode-stream @decode="onDecode"></qrcode-stream>
        </div>
      </v-layout>
     </v-container>
  </v-content>
</template>

<script>
import { QrcodeStream } from "vue-qrcode-reader";
import { isValidUuid } from "@/classes/utils";

export default {
  components: {
    QrcodeStream
  },
  methods: {
    onDecode(decodedString) {
      if (isValidUuid(decodedString)) {
        this.$router.push({ name: "pay", params: { userId: decodedString } });
      }
    }
  }
};
</script>

<style>
.text-overlay {
  position: absolute;
  z-index: 123;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 1em;
  top: 5%;
}

.qrcode-stream__inner-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
}
.qrcode-stream__inner-wrapper > video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
/* 1. No object-fit support: */
@media (min-aspect-ratio: 16/9) {
  .qrcode-stream__inner-wrapper > .qrcode-stream__camera {
    height: 300%;
    top: -100%;
  }
}
@media (max-aspect-ratio: 16/9) {
  .qrcode-stream__inner-wrapper > .qrcode-stream__camera {
    width: 300%;
    left: -100%;
  }
}
/* 2. If supporting object-fit, overriding (1): */
@supports (object-fit: cover) {
  .qrcode-stream__inner-wrapper > .qrcode-stream__camera {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
