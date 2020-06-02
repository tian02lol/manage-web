import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

let routes = []

const requireContext = require.context(
  './',
  true,
  /\.js$/
)
requireContext.keys().forEach(filename => {
  if (filename === './index.js') return
  const routerModule = requireContext(filename)
  routes = [...routes, ...(routerModule.default || routerModule)]
})

const router = new VueRouter({
  routes
})

router.addRoutes([
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/about',
    name: 'About',
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/layout/home.vue')
  }
])

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.path === '/login') {
    next()
  } else {
    var token = localStorage.getItem('token')
    if (token === null || token === '') {
      next('/login')
    } else {
      next()
    }
  }
})
router.afterEach((to, from) => {
  NProgress.done()
})
export default router
