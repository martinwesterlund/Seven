<template>
  <div>
    <vue-slider v-model="state.speed" v-bind="state.vueSliderOptions" />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/vue-slider-component@latest/theme/default.css"
    />
  </div>
</template>

<script>
import VueSlider from "vue-slider-component";
export default {
  components: {
    VueSlider
  },
  computed: {
    state() {
      return this.$store.state;
    }
  },
};
</script>

<style>
</style>