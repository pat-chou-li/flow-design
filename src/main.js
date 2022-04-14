import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Graph } from '@antv/x6'
import ElementUI from 'element-ui'
import './element-variables.scss'
import './static/font'
import axios from 'axios'
import VueAxios from 'vue-axios'
import dataV from '@jiaminghi/data-view'
import mynav from './components/mynav/mynav.vue'
axios.defaults.baseURL = 'http://124.222.21.252:3900'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.interceptors.request.use(
	(config) => {
		let token = window.localStorage.getItem('token')
		if (token) {
			config.headers['token'] = token
		}
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

Vue.use(dataV)
Vue.prototype.$axios = axios
Vue.use(VueAxios, axios)
Vue.component('mynav', mynav)
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
	router,
	store,
	Graph,
	render: (h) => h(App),
}).$mount('#app')
