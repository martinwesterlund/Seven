import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import { store } from './store/store'
import Start from './components/Start.vue'
import About from './components/About.vue'
import Rules from './components/Rules.vue'
import Game from './components/Game.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Start },
  { path: '/about', component: About },
  { path: '/rules', component: Rules },
  { path: '/game', component: Game }
  
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
