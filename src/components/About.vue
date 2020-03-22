<template>
  <div>
    <div id="about-wrapper">
      <h1 id="header">Om spelet</h1>
      <p>JavaScript-baserat kortspel, gjort av Martin Westerlund 2020. Tekniker som använts är bland annat JavaScript, Vue.js, Vuex och Vue Router.</p>
      <router-link to="/">
        <button id="back">Tillbaka</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#about-wrapper {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 18px;
  text-shadow: 0 0 10px #000;
}

p {
  text-align: center;
  margin: 20px;
  margin-bottom: 15%;
}

#back {
  background-color: transparent;
  border: none;
  outline: none;
  color: #fff;
  text-shadow: 0 0 10px #000;
  padding: 10px;
  font-family: "Slackey", cursive;
  font-size: 30px;
  animation: button 0.7s linear;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  cursor: pointer;
}

@keyframes button {
  0% {
    transform: scaleX(1) scaleY(1.05);
  }
  50% {
    transform: scaleX(1.025);
  }
  100% {
    transform: scaleX(1.05) scaleY(1);
  }
}
</style>