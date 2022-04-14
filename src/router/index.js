import Vue from 'vue'
import VueRouter from 'vue-router'
import flow from '../components/flow/flow.vue'
import login from '../components/login/login.vue'
import commodity from '../components/commodity/commodity.vue'
import home from '../components/home/home'
import data from '../views/BigData1.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/flow',
		name: 'flow',
		component: flow,
	},
	{
		path: '/login',
		name: 'login',
		component: login,
	},
	{
		path: '/',
		name: 'home',
		component: home,
	},
	{
		path: '/home',
		name: 'home',
		component: home,
	},
	{
		path: '/commodity',
		name: 'commodity',
		component: commodity,
	},
	{
		path: '/data',
		name: 'data',
		component: data,
	},
]

const router = new VueRouter({
	//mode: 'history',
	base: process.env.BASE_URL,
	routes,
})

//不需要登录也能访问的路由白名单
const whiteList = ['/login', '/register', '/home', '/']
router.beforeEach((to, from, next) => {
	document.title = 'Mapiser服务编排系统'
	if (!whiteList.includes(to.path)) {
		const token = window.localStorage.getItem('token')
		if (!token || token === 'undefined') {
			Vue.prototype.$message.error('请先登录')
			next({
				path: '/login',
				query: {
					redirect: to.fullPath,
				},
			})
		}
	}
	next()
})
export default router
