<template>
  <v-layout row justify-center>
    <v-dialog
      v-model="show"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">{{header}}</v-card-title>

        <v-card-text>
          {{body}}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click="$emit('ok');"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true
    },
    header: {
        type: String,
        required: false
    },
    body: {
        type: String,
        required: true
    }
  }
};
</script>

<style>
</style>
