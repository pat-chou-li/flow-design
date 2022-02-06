import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		token: localStorage.getItem('token')
			? localStorage.getItem('token')
			: '',
	},
	mutations: {
		changeLogin(state, payload) {
			state.token = payload.token
			localStorage.setItem('token', payload.token)
		},
	},
	actions: {},
	modules: {},
})
