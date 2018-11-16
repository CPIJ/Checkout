<template>
 <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-8">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Betalen</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-data-table :loading="loading" hide-actions
                  :headers="headers"
                  :items="shoppingCart.items"
                >
                <template slot="no-data">
                  De winkelwagen is leeg. Doe eerst wat boodschappen voordat je gaat afrekenen.
                </template>
                  <template slot="items" slot-scope="props">
                    <tr>
                      <td>{{props.item.name}}</td>
                      <td>{{props.item.amount}}</td>
                      <td>€{{(props.item.amount * props.item.price).toFixed(2)}}</td>
                    </tr>
                  </template>
                  <template v-if="!loading" slot="footer">
                    <td></td>
                    <td>Totaal</td>
                    <td class="font-weight-bold">€{{totalAmount}}</td> 
                </template>
                </v-data-table>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat color="error" @click="cancel">Annuleren</v-btn>
                <v-btn flat color="success" @click="pay" :loading="paymentInProgess">Betaal</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>

<script>
import { timeout } from "@/classes/utils";
import Message from "@/classes/Message";

export default {
  props: {
    userId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      shoppingCart: { items: [] },
      loading: true,
      paymentInProgess: false,
      headers: [
        {
          text: "Product",
          value: "product",
          sortable: false
        },
        {
          text: "Aantal",
          value: "Aantal",
          sortable: false
        },
        {
          text: "Prijs",
          value: "prijs",
          sortable: false
        }
      ]
    };
  },
  async mounted() {
    this.shoppingCart = await this.$productService.getShoppingCart(this.userId);
    this.$mqtt.subscribe("sw-checkout/cash-register");
    this.loading = false;
  },
  methods: {
    async pay() {
      this.paymentInProgess = true;

      const payementSuccesful = await this.$productService.payShoppingCart(
        this.shoppingCart.id
      );

      if (payementSuccesful) {
        this.$mqtt.publish(
          "sw-checkout/cash-register",
          new Message("PAYMENT_SUCESSFUL", this.userId).toString()
        );
        await this.$productService.createNewCartFor(this.userId);
        alert("Uw betaling is gelukt!");
        this.$router.push({ name: "cash-register" });
      } else {
        alert(
          "Erg ging iets fout tijdens de betaling, probeer het opnieuw a.u.b."
        );
      }

      this.paymentInProgess = false;
    },

    cancel() {
      if (confirm("Wil je deze betaling afbreken?")) {
        this.$router.go(-1);
      }
    }
  },
  computed: {
    totalAmount() {
      return this.shoppingCart.items
        .reduce((sum, current) => (sum += current.price * current.amount), 0)
        .toFixed(2);
    }
  }
};
</script>

<style>
</style>
