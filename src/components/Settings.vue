<template>
  <div>
    <div id="settings-wrapper">
      <h1>Speltempo: {{ state.speed }}</h1>
      <vue-slider id="slider" v-model="state.speed" v-bind="state.vueSliderOptions" />
      <h1>Hjälpmedel</h1>
      <div id='slider-info'>
        <span>Av</span>
        <label class="switch">
          <input id='switchValue' v-model='state.helpOn' type="checkbox">
          <span class="slider round"></span>
        </label>
        <span>På</span>
      </div>

      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/vue-slider-component@latest/theme/default.css"
      />
    </div>
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
  }
};
</script>

<style scoped>
#settings-wrapper {
  padding: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  color: #fff;
  font-size: 18px;
  text-shadow: 0 0 10px #000;
  text-align: center;
}

#slider-info{
  display:flex;
  margin: 0 auto;
}

#slider {
  margin: 0 20%;
}

.switch {
  position: relative;
  /* display: inline-block; */
  width: 60px;
  height: 34px;
  margin: 0 20px;
}


.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: #fff;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}
/* 
input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
} */

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>