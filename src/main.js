import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import { store } from './store/store'
import Start from './components/Start.vue'
import About from './components/About.vue'
import Rules from './components/Rules.vue'
import Game from './components/Game.vue'
import Scoreboard from './components/Scoreboard.vue'
import Settings from './components/Settings.vue'
import Setup from './components/Setup.vue'
import Warning from './components/Warning.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Start },
  { path: '/about', component: About },
  { path: '/rules', component: Rules },
  { path: '/game', component: Game },
  { path: '/scoreboard', component: Scoreboard },
  { path: '/settings', component: Settings },
  { path: '/setup', component: Setup },
  { path: '/warning', component: Warning }
  
];

Vue.config.productionTip = false

const router = new VueRouter ({
	routes
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
