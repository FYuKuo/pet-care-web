import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import SignUp from '@/views/SignUp.vue'
import ConfirmSignUp from '@/views/ConfirmSignUp.vue'
import ForgotPassword from '@/views/ForgotPassword.vue'
import ConfirmForgotPassword from '@/views/ConfirmForgotPassword.vue'
import User from '@/views/User.vue'
import Dashboard from '@/views/Dashboard.vue'
import { useAuthStore } from '@/stores/auth.js'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		meta: { layout: 'default', requiresAuth: false }
	},
	{
		path: '/login',
		name: 'Login',
		component: Login,
		meta: { layout: 'login', requiresAuth: false }
	},
	{
		path: '/forgot-password',
		name: 'ForgotPassword',
		component: ForgotPassword,
		meta: { layout: 'forgot-password', requiresAuth: false }
	},
	{
		path: '/sign-up',
		name: 'SignUp',
		component: SignUp,
		meta: { layout: 'sign-up', requiresAuth: false }
	},
	{
		path: '/confirm-sign-up',
		name: 'ConfirmSignUp',
		component: ConfirmSignUp,
		meta: { layout: 'confirm-sign-up', requiresAuth: false }
	},
	{
		path: '/confirm-forgot-password',
		name: 'ConfirmForgotPassword',
		component: ConfirmForgotPassword,
		meta: { layout: 'confirm-forgot-password', requiresAuth: false }
	},
	{
		path: '/user',
		name: 'User',
		component: User,
		meta: { layout: 'auth', requiresAuth: true }
	},
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: Dashboard,
		meta: { layout: 'dashboard', requiresAuth: false }
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})


// 路由守衛
router.beforeEach(async (to, from, next) => {
	const authStore = useAuthStore()

	if (to.name === 'Login' || to.name === 'ForgotPassword' || to.name === 'SignUp' || to.name === 'ConfirmSignUp' || to.name === 'ConfirmForgotPassword') {
		return next()
	}

	if (to.name === 'Dashboard') {
		to.meta._component = Dashboard
		return next()
	}

	// 確保登入狀態
	await authStore.checkAuth()

	// 如果是首頁
	if (to.name === 'Home') {
		console.log("authStore.isLogin", authStore.isLogin);

		if (authStore.isLogin) {
			// 如果登入，導向登入後首頁（但網址不變）
			to.meta._component = User
		} else {
			// 如果沒登入，導向訪客首頁
			to.meta._component = Home
		}
		return next()
	}

	// 如果頁面需要登入，但沒登入
	if (to.meta.requiresAuth && !authStore.isLogin) {
		return next('/')
	}

	next()
})

// 動態元件處理（解決上面動態設定 component 的問題）
router.beforeResolve((to, from, next) => {
	if (to.meta._component) {
		to.matched[0].components = { default: to.meta._component }
	}
	next()
})

export default router