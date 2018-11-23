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
                    <tr :class="{'green lighten-5': props.item.isCharity}">
                      <td>{{props.item.name}}</td>
                      <td>{{props.item.isCharity ? "" : props.item.amount}}</td>
                      <td>{{props.item.isCharity ? "" : "€" + (props.item.amount * props.item.price).toFixed(2)}}</td>
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
        this.$router.push({ name: "cash-register" });
      } else {
        alert("Er ging iets fout tijdens uw betaling, probeer het opniew.");
      }

      this.paymentInProgess = false;
    },

    async cancel() {
      const wantsToCancel = confirm(
        "Weet u zeker dat u de betaling wil afbreken?"
      );

      if (wantsToCancel) {
        this.$router.go(-1);
      }
    }
  },
  computed: {
    totalAmount() {
      const total = this.shoppingCart.items
        .reduce((acc, curr) => (acc += curr.price * curr.amount), 0)
        .toFixed(2);

      if (this.shoppingCart.items.filter(p => p.isCharity).length > 0) {
        const roundedUp = Math.ceil(total).toFixed(2);

        if (roundedUp === total) {
          return (Number(roundedUp) + 1).toFixed(2);
        } else {
          return roundedUp;
        }
      }

      return total;
    }
  }
};
</script>

<style>
</style>
