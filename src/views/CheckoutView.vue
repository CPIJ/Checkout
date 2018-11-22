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

const donationEan = "0000000000016";

export default {
  components: {
    VueQr
  },

  async mounted() {
    await this.askForDonation();
    this.$mqtt.subscribe("sw-checkout/cash-register");
  },

  methods: {
    async askForDonation() {
      const cart = await this.$productService.getShoppingCart(
        this.$store.state.userId
      );

      console.log(cart)

      if (cart.items.filter(i => i.ean === donationEan).length > 0) {
        return;
      }

      const wantsToDonate = confirm("Wilt u 1 euro doneren aan het goede doel?");

      if (wantsToDonate) {
        const product = await this.$productService.addToShoppingCart(
          {
            ean: donationEan
          },
          this.$store.state.userId
        );
      }
    }
  },

  mqtt: {
    "sw-checkout/cash-register": async function(bytes) {
      const message = Message.parse(decode(bytes));

      if (
        message.subject === "PAYMENT_SUCESSFUL" &&
        message.body === this.$store.state.userId
      ) {
        alert("Uw betaling is geslaagd!");

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
