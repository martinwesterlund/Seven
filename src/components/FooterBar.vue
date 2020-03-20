<template>
  <div>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <footer id="footer">
      <div id="footer-bg"></div>

      <router-link to="/warning">
        <i class="fa fa-home" :class="{selected : $route.path === '/warning'}"></i>
      </router-link>
      <router-link to="/rules">
        <i class="fa fa-question-circle" :class="{selected : $route.path === '/rules'}"></i>
      </router-link>
       <router-link to="/game">
        <i class="fa fa-play" :class="{selected : $route.path === '/game'}"></i>
      </router-link>
      <router-link to="/scoreboard">
        <i class="fa fa-trophy" :class="{selected : $route.path === '/scoreboard'}"></i>
      </router-link>
      <router-link to="/settings">
        <i class="fa fa-gears" :class="{selected : $route.path === '/settings'}"></i>
      </router-link>
    </footer>
    
  </div>
</template>

<script>
export default {
  
  
};
</script>

<style scoped>

#footer {
  width: 100%;
  height: 60px;
  margin: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0%;
  opacity: 0;
  animation-name: footer-fade;
  animation-duration: 1s;
  animation-fill-mode: forwards;
}

#footer-bg {
  width: 100%;
  height: 60px;
  position: fixed;
  background-color: #003a00;
  opacity: 0.9;
  z-index: -1;
}

i {
  color: #fff;
  font-size: 30px;
  opacity: 1;
}

.selected{
  color: #cec107;
  animation: button 0.7s linear;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

@keyframes footer-fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes button {
  0% {
    transform: scaleX(1) scaleY(1.1);
  }
  50% {
    transform: scaleX(1.05);
  }
  100% {
    transform: scaleX(1.1) scaleY(1);
  }
}
</style>