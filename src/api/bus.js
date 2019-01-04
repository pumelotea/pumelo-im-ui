import Vue from 'vue'
export default {
  install(){
    window.bus = new Vue()
  }
}
