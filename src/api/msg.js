import API from './index'
import Vue from "vue";
import Vuex from 'vuex';
import DB from './db'
import Notice from './notice'
Vue.use(Vuex);
/**
 * 消息长连接封装
 */
export default {
  install() {
    Vue.prototype.$msg = this
  },
  store: new Vuex.Store({
    state: {
      messageMap: {},//好友群组消息列表map
      sysMessage: [],//系统消息列表
      activeChatPop: '',//当前激活的聊天pop
    }
  }),
  heartTimer: null,
  ws: null,
  connect() {
    let wsurl  = ""
    if (process.env.NODE_ENV === "development"){
        wsurl = window.api.dev.ws
    }

    if (process.env.NODE_ENV === "product") {
        wsurl = window.api.prod.ws
    }
    this.ws = new WebSocket(wsurl + '?' + API.getToken())
    let that = this
    //监听消息接收
    this.ws.onmessage = function (e) {
      let data = JSON.parse(e.data)
      if(data.msgType === 'SIGNAL'){
        window.bus.$emit('signaling',data)
      } else if (data.msgType === 'SYS') {
        if (data.contentType === 'ASK_FRIEND') {
          data.content = JSON.parse(data.content)
          that.store.state.sysMessage.push(data)
          Notice.openSysMsg({
            msg:'您有好友申请消息'
          })
        }else{
          Notice.openSysMsg({
            msg:data.content
          })
          //添加好友成功刷新好友列表
          if (data.code === '1'){
            API.getFriendList().then(res=>{
              if (res.code === 200){
                for(let e of res.data){
                  Vue.set(API.store.state.friendList,e.uid,e)
                }
              }
            },err=>{})
          }
        }
      } else {//好友消息的情况下
        //持久化消息
        DB.insert(data)
        let uid = null
        //判断来源
        if (API.getUid() === data.from) {//如果是自己的确认消息，需要插入到to的list里面，然后持久化
          uid = data.to
        } else {
          uid = data.from
        }
        //初始化map-list
        if (that.isNewChater(uid)) {
         that.createNewChaterMem(uid)
        }
        //设置更新时间
        Vue.set(that.store.state.messageMap[uid], 'updatedAt', Date.parse(new Date()))
        that.store.state.messageMap[uid].list.push(data)
        //如果当前消息不是自己的确认消息，也不是当前激活窗口的消息，做一下提示
        if (API.getUid() !== data.from && that.getActive() !== data.from) {
          that.store.state.messageMap[data.from].unreadCount++
          Notice.openChatMsg({
            name: API.getUserName(data.from),
            msg: data.content
          })
          that.playTip()
        }else if(that.getActive() === data.from && that.store.state.messageMap[data.from].isViewHistory===true){
          that.store.state.messageMap[data.from].unVisibleCount++
        }
      }
    }
  }
  ,
  close() {

  }
  ,
  sendToUser(msg) {
    this.ws.send(JSON.stringify(msg))
  }
  ,
  turnOnHeartBeat() {

  }
  ,
  turnOffHeartBeat() {

  },
  isNewChater(uid){
    return this.store.state.messageMap[uid] === undefined
  },
  //创建新聊天对象的内存空间，拿来放消息数据
  createNewChaterMem(uid){
    Vue.set(this.store.state.messageMap, uid, {
      list: [],
      unreadCount: 0,
      isViewHistory:false,
      unVisibleCount:0
    })
  },
  //激活聊天窗口为某个用户的
  activePop(uid) {
    this.store.state.activeChatPop = uid
    this.store.state.messageMap[uid].unreadCount = 0
  },
  //获取激活窗口的用户
  getActive() {
    return this.store.state.activeChatPop
  },
  //清空消息数组
  cleanSysMessage() {
    this.store.state.sysMessage = []
  },
  //播放提示
  playTip(){
    document.getElementById('tip').play()
  },
  //设置窗口是否在浏览历史消息
  setIsViewHistory(uid,isHistory){
    this.store.state.messageMap[uid].isViewHistory = isHistory
  },
  //放入离线消息预览
  putOfflineMessagePreview(list){
    for(let e of list){
      DB.insert(e.message)
      if (this.isNewChater(e.message.from)) {
        this.createNewChaterMem(e.message.from)
      }
      this.store.state.messageMap[e.message.from].unreadCount = e.count
      this.store.state.messageMap[e.message.from].list.push(e.message)
    }
  },
  //放入离线消息
  putOfflineMessage(from,list){
    for(let e of list){
      DB.insert(e)
      if (this.isNewChater(e.from)) {
        this.createNewChaterMem(e.from)
      }
      this.store.state.messageMap[e.from].list.push(e)
    }
  },
  isNoneMsg(){
    for (let key in this.store.state.messageMap){
      return false;//返回false，不为空对象
    }
    return true;//返回true，为空对象
  },
  cleanMsg() {
    this.store.state.messageMap = {}
    this.store.state.sysMessage = []
    this.store.state.activeChatPop = ''
    this.ws.close()
    this.ws = null
  }

}
