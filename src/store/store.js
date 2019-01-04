import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
  state:{
    token:null,
    nav:false,
    //菜单状态
    mActive:{},
    //菜单数据
    menu:[],
    permission:[],
    breadCrumb:{
      moduleName: '',
      moduleKey: '',
      menuName:'',
      menuKey: '',
      icon:''
    }
  }
})
