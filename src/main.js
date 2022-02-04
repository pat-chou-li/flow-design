import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Graph } from '@antv/x6'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './static/font'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
	router,
	store,
	Graph,
	render: (h) => h(App),
}).$mount('#app')
