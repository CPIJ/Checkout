<template>
    <div id="launch-view">
        <p>Loading...</p>
    </div>
</template>

<script>
export default {
    async mounted() {
        await this.$productClassifier.init()
        this.$router.push({ name: 'home' })
    }
};
</script>

<style>
#launch-view {
  height: 100vh;
  line-height: 95vh;
  text-align: center;
}

p {
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
  font-weight: bold;
}
</style>
