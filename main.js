import App from './App'
import store from './store';
import axios from 'axios'
Vue.prototype.$axios = axios

//导入网络请求包
import { $http } from '@escook/request-miniprogram'

uni.$http = $http
//请求拦截器
$http.beforeRequest = function(options){
	uni.showLoading({
		title:'数据加载中...'
	})
} 
//响应拦截器
$http.afterRequest = function(){
	uni.hideLoading()
}
//请求根路径
$http.baseUrl = 'http://localhost:8000'


uni.$showMsg = function(title = '数据请求失败！', duration = 1500) {
  uni.showToast({
    title,
    duration,
    icon: 'none'
  })
}


// #ifndef VUE3
import Vue from 'vue'
import divider from "@/components/common/divider.vue"
Vue.component('divider',divider)
Vue.config.productionTip = false
import uView from 'uview-ui'
Vue.use(uView)

App.mpType = 'app'
const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif