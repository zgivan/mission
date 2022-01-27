import App from './App'

// #ifndef VUE3
import Vue from 'vue'

import store from './store/index.js'


// 引用全局组件
import commonFixedLine from './components/use-components/common-fixed-line.vue'
Vue.component('common-fixed-line',commonFixedLine)


Vue.config.productionTip = false
App.mpType = 'app'

Vue.prototype.$store = store

const app = new Vue({
	store,
  ...App
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