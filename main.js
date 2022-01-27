import App from './App'

// #ifndef VUE3
import Vue from 'vue'

// 引用全局组件
import commonFixedLine from './components/use-components/common-fixed-line.vue'
Vue.component('common-fixed-line',commonFixedLine)
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
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