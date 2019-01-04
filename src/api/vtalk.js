import Vue from "vue";
import Vuex from 'vuex';
import API from './index'
import Notice from './notice'
Vue.use(Vuex);
/**
 * 信令组件
 */
export default {
  install() {
    Vue.prototype.$vtalk = this
    window.vtalk = this
    window.bus.$on('signaling', data => {
      let signal = JSON.parse(data.content)
      if (signal.type === "offer") {
        //必须是没接入任何数据才允许接通
        if ( window.vtalk.store.state.to === '' &&  window.vtalk.store.state.to === ''){
          window.vtalk.store.state.to = data.from
          window.vtalk.store.state.from = data.to
          window.vtalk.remoteOffer = signal
          Notice.openVTalkMsg({
            name:API.getUserName(data.from)
          })
          // window.vtalk.take()
        }
      } else if (signal.type === "answer") {
        window.vtalk.setRemoteSpd(signal)
      } else if (signal.type === "candidate") {
        window.vtalk.setCandidate(signal)
      } else if (signal.type === "bye") {
        window.vtalk.close()
      } else if (signal.type === "nowaiting") {
        window.vtalk.close()
      }
    })
  },
  store: new Vuex.Store({
    state: {
      from: '',
      to: '',
      isStarted: false,//是否正在通话
      isWaiting: false,//是否正在等待
      isCaller: false,//是否是呼叫者,
      isShow: false,
    }
  }),
  pc: null,//连接对象
  localStream: null,
  remoteStream: null,
  remoteOffer: null,
  sendSignal(uid, obj) {
    API.sendSignal(uid, JSON.stringify(obj)).then(res => {
    }, err => {
    })
  },
  isWaiting() {
    return this.store.state.isWaiting
  },
  isStarted() {
    return this.store.state.isStarted
  },
  isCaller() {
    return this.store.state.isCaller
  },
  //呼叫
  call(to) {
    if (this.isWaiting() || this.isStarted()){
      return
    }
    this.store.state.to = to
    this.store.state.from = API.getUid()
    this.store.state.isShow = true
    this.store.state.isWaiting = true
    this.store.state.isCaller = true
    this.openLocalStream(this.onUserMediaSuccessAndOffer)
  },
  //关闭，重置为初始状态
  close() {
    this.store.state.to = ''
    this.store.state.from = ''
    this.store.state.isWaiting = false
    this.store.state.isStarted = false
    this.remoteOffer = null
    if (this.localStream) {
      this.localStream.getTracks().forEach(function (track) {
        if (track){
          track.stop();
        }
      });
    }
    if (this.remoteStream) {
      this.remoteStream.getTracks().forEach(function (track) {
        if (track){
          track.stop();
        }
      });
    }
    if (this.pc) {
      this.pc.close();
    }
    this.store.state.isShow = false
  },
  //接听
  take() {
    if (this.isWaiting() || this.isStarted()){
      return
    }
    this.store.state.isShow = true
    this.store.state.isWaiting = true
    this.openLocalStream(this.onUserMediaSuccessAndAnswer)
  },
  //打开本地媒体流
  openLocalStream(success) {
    let mediaStreamConstraints = {
      audio: true,
      video: true,
    }
    navigator.mediaDevices.getUserMedia(mediaStreamConstraints).then(success, window.vtalk.onUserMediaError);
  },
  //主动打开媒体成功回调
  onUserMediaSuccessAndOffer(stream) {
    window.vtalk.localStream = stream
    //先显示出来
    document.getElementById('localVideo').srcObject = stream
    //创建连接
    window.vtalk.createPeerConnection()
    //发送offer
    window.vtalk.createOfferAndSend()
  },
  //被动打开媒体成功回调
  onUserMediaSuccessAndAnswer(stream) {
    window.vtalk.localStream = stream
    //先显示出来
    document.getElementById('localVideo').srcObject = stream
    //创建连接
    window.vtalk.createPeerConnection()
    //设置远端spd
    window.vtalk.pc.setRemoteDescription(new RTCSessionDescription(window.vtalk.remoteOffer)).then()
    //发送answer
    window.vtalk.createAnswerAndSend()
  },
  //打开媒体失败回调
  onUserMediaError(error) {
    console.log(error)
  },
  //创建p2p连接
  createPeerConnection() {
    let PeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    let server = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]};
    window.vtalk.pc = new PeerConnection(server)
    window.vtalk.pc.addStream(window.vtalk.localStream)//添加本地视频流
    window.vtalk.pc.onicecandidate = window.vtalk.onIceCandidate;
    window.vtalk.pc.onconnecting = window.vtalk.onSessionConnecting;
    window.vtalk.pc.onopen = window.vtalk.onSessionOpened;
    window.vtalk.pc.onaddstream = window.vtalk.onRemoteStreamAdded;
    window.vtalk.pc.onremovestream = window.vtalk.onRemoteStreamRemoved;
  },
  //穿透回调
  onIceCandidate(event) {
    if (event.candidate) {
      let obj = {
        type: "candidate",
        label: event.candidate.sdpMLineIndex,
        id: event.candidate.sdpMid,
        candidate: event.candidate.candidate
      }
      window.vtalk.sendSignal(window.vtalk.store.state.to, obj)
    }
  },
  //连接启动回调
  onSessionConnecting(message) {
    console.log("开始连接");
  },
  //连接成功回调
  onSessionOpened(message) {
    console.log("连接打开");
  },
  //视频接入回调
  onRemoteStreamAdded(event) {
    console.log("远程视频添加成功");
    window.vtalk.remoteStream = event.stream
    document.getElementById('localVideo').srcObject = event.stream
    document.getElementById('remoteVideo').srcObject = window.vtalk.localStream
  },
  onRemoteStreamRemoved(event){
    console.log("远程视频移除");
    window.vtalk.close()
  },
  setLocalAndSendMessage(sessionDescription) {
    window.vtalk.pc.setLocalDescription(sessionDescription).then();
    //发送消息sessionDescription
    window.vtalk.sendSignal(window.vtalk.store.state.to, sessionDescription)
  },
  createOfferAndSend() {
    window.vtalk.pc.createOffer().then(window.vtalk.setLocalAndSendMessage)
  },
  createAnswerAndSend() {
    window.vtalk.pc.createAnswer().then(window.vtalk.setLocalAndSendMessage)
  },
  setRemoteSpd(answer){
    window.vtalk.pc.setRemoteDescription(new RTCSessionDescription(answer)).then()
  },
  /**
   *
   * @param signal
   */
  setCandidate(signal){
    if (window.vtalk.pc && window.vtalk.pc.signalingState !== 'closed') {
      let candidate = new RTCIceCandidate({
        sdpMLineIndex : signal.label,
        candidate : signal.candidate
      });
      window.vtalk.pc.addIceCandidate(candidate).then();
    }
  }

}
