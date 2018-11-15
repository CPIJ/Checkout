<template>
    <div id="checkout-view">
        <div class="qr-container">
            
            <div class="qr">
                <div>
                    <p>Scan deze code bij de kassa om af te rekenen.</p>    
                    <vue-qr :text="$store.state.userId" :size="vw"></vue-qr>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VueQr from "vue-qr";
import { calculateViewWidth, decode } from "@/classes/utils";
import Message from '@/classes/Message'

export default {
  components: {
    VueQr
  },

  mounted() {
    this.$mqtt.subscribe("sw-checkout/cash-register");
  },

  mqtt: {
    "sw-checkout/cash-register": function(bytes) {
      const message = Message.parse(decode(bytes))

      if (message.subject === 'PAYMENT_SUCESSFUL' && message.body === this.$store.state.userId) {
        alert('Bedankt voor uw betaling!')
        this.$router.push({ name: 'home' })
      }
    }
  },

  data() {
    return {
      loading: true
    };
  },

  computed: {
    vw() {
      return calculateViewWidth(60);
    }
  }
};
</script>

<style>
#checkout-view {
  width: 100vw;
  height: 100vh;
}

.qr-container p {
  text-align: center;
  margin-bottom: 7vw;
  font-size: 1.2em;
}

.qr {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
