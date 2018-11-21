<template>
  <v-content>
    <v-container fluid fill-height>
      <v-toolbar color="primary" dark app>
        <v-toolbar-title>Afrekenen</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn @click="$router.go(-1)" flat><v-icon>arrow_back</v-icon></v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-layout align-center justify-center column >
        <p style="width: 60vw; text-align: center;" class="subheading">Scan deze code bij de kassa om af te rekenen.</p>    
        <vue-qr id="qr" :text="$store.state.userId" :size="vw"></vue-qr>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import VueQr from "vue-qr";
import { calculateViewWidth, decode } from "@/classes/utils";
import Message from "@/classes/Message";

export default {
  components: {
    VueQr
  },

  async mounted() {
    this.$mqtt.subscribe("sw-checkout/cash-register");
  },

  mqtt: {
    "sw-checkout/cash-register": async function(bytes) {
      const message = Message.parse(decode(bytes));

      if (
        message.subject === "PAYMENT_SUCESSFUL" &&
        message.body === this.$store.state.userId
      ) {
        await this.$dialog.message.success(
          "Uw betaling is geslaagd! U wordt teruggestuurd naar de winkel in 5 seconden."
        );

        this.$router.push({ name: "home" });
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

<style scoped>
</style>
