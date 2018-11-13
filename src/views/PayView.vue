<template>
    <div id="pay-view">
        <button @click="pay">PAY</button>
    </div>
</template>

<script>
export default {
  props: {
    userId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      shoppingCart: null
    };
  },
  async mounted() {
    this.shoppingCart = await this.$productService.getShoppingCart(this.userId) 
  },
  methods: {
      pay() {
          console.log('payyy')
      }
  }
};
</script>

<style>
</style>
