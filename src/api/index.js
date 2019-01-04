import './http_config'
import {post, get, put, del} from './http_config'
import Vue from "vue";
import {String} from '../utils/string'
import Vuex from 'vuex';
/**
 * HTTP API接口封装
 */
export default {
  systemMap: {
    'SYS': '系统消息'
  },
  store: new Vuex.Store({
    state: {
      friendList:{}
    }
  }),
  install() {
    Vue.prototype.$api = this
  },
  //--------------------------------------------------------------------API附属方法
  getLocalTime(str) {
    let d = new Date(str);
    let localTime = d.getTime();
    let localOffset = d.getTimezoneOffset() * 60000;   //getTimezoneOffset()返回是以分钟为单位，需要转化成ms
    let utc = localTime + localOffset;
    let offset = 8;
    let china = utc + (3600000 * offset);
    let nd = new Date(china);
    return nd.toLocaleDateString()
  },
  //获取token
  getToken() {
    return localStorage.getItem('token')
  },
  isLogin() {
    return !String.isEmpty(this.getToken())
  },
  //清除登录状态
  cleanLoginStatus() {
    localStorage.removeItem('token')
    localStorage.removeItem('uid')
    localStorage.removeItem('userVo')
  },
  setToken(token, userVo) {
    localStorage.setItem('token', token)
    localStorage.setItem('uid', userVo.uid)
    localStorage.setItem('userVo', JSON.stringify(userVo))
  },
  //获取自己的名称
  getName(){
    let userVo = localStorage.getItem('userVo');
    if (String.isEmpty(userVo)){
      return this.getUid()
    }
    return JSON.parse(userVo).name
  },
  //获取自己的uid
  getUid() {
    return localStorage.getItem('uid')
  },
  getUserName(uid) {
    let name = uid
    let user = this.store.state.friendList[uid]
    if (user !== undefined) {
      name = user.name
      if (!String.isEmpty(user.remark)){
        name = user.remark
      }
      return name
    }
    if (!String.isEmpty(this.systemMap[uid])) {
      name = this.systemMap[uid]
    }
    return name
  },
  cleanFriendList(){
    this.store.state.friendList = {}
  },
  isNoneFriend(){
    for (let key in this.store.state.friendList){
      return false;//返回false，不为空对象
    }
    return true;//返回true，为空对象
  },
  //-------------API
  register(name, password) {
    let params = new URLSearchParams()
    params.append('name', name)
    params.append('password', password)
    return post('/register', params)
  },
  login(uid, password) {
    let params = new URLSearchParams()
    params.append('uid', uid)
    params.append('password', password)
    return post('/login', params)
  },
  logout(){
    return post('/logout')
  },
  getFriendList() {
    return get('/friends')
  },
  getFriend(uid) {
    return get(`/friend/${uid}`)
  },
  remarkFriend(uid, remark) {
    let params = new URLSearchParams()
    params.append('remark', remark)
    return put(`/friend/${uid}/remark`, params)
  },
  deleteFriend(uid, both) {
    return del(`/friend/${uid}/${both}`,)
  },
  searchUser(keyword,page,size){
    return get('/search/users',{
      keyword:keyword,
      page:page,
      size:size
    })
  },
  askFriend(targetUid,reason){
    let params = new URLSearchParams()
    params.append('targetUid', targetUid)
    params.append('reason', reason)
    return post('/ask_friend',params)
  },
  getReviewAskList(){
    return get('/ask_friends')
  },
  reviewAskFriend(friendAskId,isAgree){
    let params = new URLSearchParams()
    params.append('isAgree', isAgree)
    return put(`/ask_friend/${friendAskId}`,params)
  },
  getOfflineMessagePreview(){
    return get('/message_preview')
  },
  getOfflineMessage(uid){
    return get(`/offline_message/${uid}`)
  },
  sendSignal(uid,json){
    let params = new URLSearchParams()
    params.append('json', json)
    return post(`/signal/${uid}`,params)
  }


}


