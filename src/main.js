import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import NoticePlugin from './api/notice'
Vue.use(NoticePlugin)
import Bus from './api/bus'
Vue.use(Bus)
import API from './api'
Vue.use(API)
import Msg from './api/msg'
Vue.use(Msg)
import DB from './api/db'
Vue.use(DB)
import Vtalk from './api/vtalk'
Vue.use(Vtalk)


import CxltToastr from 'cxlt-vue2-toastr'
import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css'
let toastrConfigs = {
  position: 'top right',
  showDuration: 400,
  hideDuration:2000,
  timeOut:3000,
  successColor:'#28d17c',
  infoColor:'#28c0de',
  warningColor:'#f57d1b',
  errorColor:'#ff666b',
  showMethod:'slideInRight'
}
Vue.use(CxltToastr, toastrConfigs)


Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})


