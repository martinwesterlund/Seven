<template>
  <div id="app">
    <h3
      id="message"
    >Detta är ett kortspel anpassat för mobilen, vänligen skruva ner skärmbredden till 480 pixlar eller mindre.</h3>
    <div id="bg"></div>
    <div id="mobile-wrapper">
      <FooterBar
        v-if="($route.path !== '/' && $route.path !== '/setup' && $route.path !== '/about')"
      ></FooterBar>

      <transition name="slide" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import FooterBar from "./components/FooterBar.vue";

export default {
  components: {
    FooterBar
  },
  created() {
    this.$store.commit("createDeck");
    this.$store.commit("createPlayers");
  },
  name: "app"
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Slackey&display=swap");

body {
  width: 100vw;
  margin: 0;
  padding: 0;
  font-family: "Slackey", cursive;
  background-color: black;
  margin: 0 auto;
}

#message {
  display: none;
}
#bg {
  position: fixed;
  width: 100%;
  height: 100%;
  background-image: url("assets/cards2.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  z-index: -5;
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}

@media only screen and (min-width: 481px) {
  body {
    width: 100%;
    padding: 0;
    font-family: "Slackey", cursive;
    background-color: transparent;
  }
  #mobile-wrapper {
    display: none;
  }

  #message {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -100px;
    margin-left: -200px;
    width: 400px;
    height: 200px;
    font-size: 28px;
    display: unset;
    color: white;
    text-align: center;
  }

  html {
    background-color: #006e09;
  }
}
</style>
