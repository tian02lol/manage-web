import axios from 'axios'
import store from '@/store'
import NProgress from 'nprogress'
import Qs from 'qs'

NProgress.configure({ showSpinner: false })
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 12000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    'X-Requested-With': 'XMLHttpRequest'
  }
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    config.headers.token = store.state.token
    if (config.method === 'post' && config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      config.data = Qs.stringify(config.data, {
        allowDots: true
      })
    }
    NProgress.start()
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 响应拦截器
request.interceptors.response.use(
  response => {
    NProgress.done()
    return response
  },
  error => {
    NProgress.done()
    return Promise.reject(error)
  }
)
export default request
