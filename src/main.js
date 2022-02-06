import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Graph } from '@antv/x6'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './static/font'
import axios from 'axios'
import VueAxios from 'vue-axios'
axios.defaults.baseURL = 'http://124.222.21.252:39001'
axios.defaults.headers.post['Content-Type'] = 'application/json'

Vue.prototype.$axios = axios
Vue.use(VueAxios, axios)

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
	router,
	store,
	Graph,
	render: (h) => h(App),
}).$mount('#app')
