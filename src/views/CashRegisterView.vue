<template>
    <div id="cash-register-view">
        <div id="video">
            <p>Scan je code om af te rekenen.</p>
            <qrcode-stream  @decode="onDecode"></qrcode-stream>
        </div>
    </div>
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
        this.$router.push({ name: 'pay', params: { userId: decodedString } });
      }
    }
  }
};
</script>

<style scoped>
#video {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 1.2em;
}

#video p {
  margin-bottom: 2vh;
}
</style>
