import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store'
import Element from 'element-ui'
import Navigation from 'vue-navigation'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/scss/App.scss'
import api from '@/api'
import map from '@/map'
import config from '@/config'
Vue.prototype.$api = api
Vue.prototype.$map = map
Vue.prototype.$config = config

// import VCharts from 'v-charts'

// Vue.use(VCharts)


 
Vue.use(Navigation, {router})
Vue.use(Element, { size: 'small' })
Vue.component('SearchPage', () => import('@/components/SearchPage.vue'));
Vue.component('SubmitForm', () => import('@/components/SubmitForm.vue'));
Vue.component('Form', () => import('@/components/Form.vue'));
Vue.config.productionTip = false


new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app')
