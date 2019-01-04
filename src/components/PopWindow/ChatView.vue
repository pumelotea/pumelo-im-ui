<template>
  <section class="vbox">
    <section class="panel panel-default" style="margin-bottom: 0;padding-bottom: 20px">
      <header class="panel-heading">
        <span class="text-info-dker">{{$api.getUserName(uid)}} </span>
        <span class="badge bg-danger pointer" @click="gotoBottom" v-if="$msg.store.state.messageMap[uid].unVisibleCount>0">{{$msg.store.state.messageMap[uid].unVisibleCount}}</span>
        <span class="pull-right text-dark"><a href="#" @click="getHistory">历史消息</a></span>
      </header>
      <section :id="'chatContainer_'+uid"
               class="chat-list panel-body"
               style="height: calc(100% - 180px);overflow: auto"
               @scroll="onscroll"
      >
        <template v-for="e,index in messageMap.list">
          <div class="text-center" v-if="messageMap.list.length>2&&index>0 && messageMap.list[index].sentAt-messageMap.list[index-1].sentAt>60000">{{prettyTime(e.sentAt/1000)}}</div>
          <article class="chat-item left" v-if="$api.getUid() !== e.from">
            <a href="#" class="pull-left thumb-sm avatar"><img src="../../assets/images/a2.png" alt="..."></a>
            <section class="chat-body" style="width: fit-content;">
              <div class="panel b-light text-sm m-b-none">
                <div class="panel-body">
                  <span class="arrow left"></span>
                  <p class="m-b-none" style="white-space: pre-wrap;">{{e.content}}</p>
                </div>
              </div>
              <small class="text-muted"><i class="fa fa-ok text-success"></i>{{formatTime(e.sentAt)}}</small>
            </section>
          </article>
          <article class="chat-item right" v-if="$api.getUid() === e.from">
            <a href="#" class="pull-right thumb-sm avatar">
              <img src="../../assets/images/a3.png" class="img-circle" alt="..."></a>
            <section class="chat-body" style="width: fit-content;float: right">
              <div class="panel bg-light text-sm m-b-none">
                <div class="panel-body">
                  <span class="arrow right"></span>
                  <p class="m-b-none" style="white-space: pre-wrap;">{{e.content}}</p>
                </div>
              </div>
              <small class="text-muted">{{formatTime(e.sentAt)}}</small>
            </section>
          </article>
        </template>
      </section>
    </section>

    <footer class="panel-footer" style="z-index: 1">
      <!-- chat form -->
      <article class="chat-item" id="chat-form">
        <section class="chat-body m-n">
          <textarea v-model="msg" class="form-control m-b"
                    style="width: 100%;min-width: 100%;max-width: 100%;height: 100px;max-height: 100px;min-height: 100px"
                    placeholder="输入文字内容"
                    @keydown="enterKey"
          ></textarea>
          <div class="input-group-btn">
            <a class="btn btn-info btn-s-md pull-right" type="button" @click="sendMessage">发送(Alt+Enter)</a>
            <a class="btn btn-primary  pull-right" type="button">图片</a>
            <a class="btn btn-primary  pull-right" type="button">文件</a>
          </div>
        </section>

      </article>
    </footer>
  </section>
</template>

<script>
  import {parseTime,formatTime} from "@/utils";
  export default {
    props:{
      uid:{
        type:String,
        required:true,
      }
    },
    data() {
      return {
        msg: '',
        scrollHeight:0
      }
    },
    methods: {
      formatTime(time) {
        return parseTime(time)
      },
      prettyTime(time){
        return formatTime(time)
      },
      sendMessage() {
        if (this.msg === ''){
          return
        }
        let to = this.uid
        if (to === 'SYS') {
          return
        }
        let msg = {
          msgType: 'USER',
          contentType: 'TEXT',
          content: this.msg,
          to: to,
          from: this.$api.getUid(),
          sentAt: new Date().getTime()
        }
        this.$msg.sendToUser(msg)
        this.msg = ''
        this.$msg.setIsViewHistory(this.uid,false)
      },
      //快捷键发送
      enterKey(e){
        if (e.altKey && e.keyCode ===13){
          this.sendMessage()
        }
      },
      gotoBottom(){
        let container = this.$el.querySelector("#chatContainer_" + this.uid);
        container.scrollTop = container.scrollHeight;
      },
      //获取历史消息
      getHistory(){
        if (this.messageMap.list.length>0){
          this.$db.select(this.$api.getUid(),this.uid,this.messageMap.list[0].messageId,this.callback)
        } else {
          this.$db.select(this.$api.getUid(),this.uid,undefined,this.callback)
        }
      },
      //历史消息回调
      callback(results){
        if (this.$msg.store.state.messageMap[this.uid] === undefined){
          this.$set(this.$msg.store.state.messageMap,this.uid,{
            list:[],
            unreadCount:0
          })
        }
        for(let e of results.rows){
          e['from'] = e.sentFrom
          e['to'] = e.sentTo
          this.$msg.store.state.messageMap[this.uid].list.push(e)
        }
        this.$nextTick(()=>{
          let container = this.$el.querySelector("#chatContainer_" + this.uid);
          container.scrollTop =container.scrollHeight - this.scrollHeight
          if (container.scrollTop >container.clientHeight ) {
            this.$msg.setIsViewHistory(this.uid,true)
          }
        })

      },
      onscroll(e){
        // console.log('scrollHeight:'+e.srcElement.scrollHeight)
        // console.log('scrollTop:'+e.srcElement.scrollTop)
        // console.log('clientHeight:'+e.srcElement.clientHeight)

        if (e.srcElement.scrollHeight - e.srcElement.scrollTop > e.srcElement.clientHeight) {
          // console.log('进入历史浏览模式')
          this.$msg.setIsViewHistory(this.uid,true)
        }else{
          // console.log('退出历史浏览模式')
          this.$msg.setIsViewHistory(this.uid,false)
          this.$msg.store.state.messageMap[this.uid].unVisibleCount = 0
        }

        //滚动顶部自动加载历史
        if (e.srcElement.scrollTop === 0){
          this.scrollHeight = e.srcElement.scrollHeight
          this.getHistory()
        }
      },
      getOfflineMessage(){
        this.$api.getOfflineMessage(this.uid).then(res=>{
          if (res.code === 200) {
            this.$msg.putOfflineMessage(this.uid,res.data.messageList)
            if (res.data.hasNext !== false) {
              this.getOfflineMessage()
            }
          }
        },err=>{})
      }

    },
    computed: {
      messageMap() {
        //对数据进行倒序排序
        this.$msg.store.state.messageMap[this.uid].list.sort(function (a,b) {
          return a.messageId - b.messageId
        })
        return this.$msg.store.state.messageMap[this.uid]
      },
      mapChange(){
        return this.$msg.store.state.messageMap[this.uid].list
      },
    },
    watch:{
      mapChange(){
        if (this.messageMap.isViewHistory === false) {
          this.$nextTick(()=>{
            let container = this.$el.querySelector("#chatContainer_" + this.uid);
            container.scrollTop = container.scrollHeight;
          })
        }
      }
    },
    mounted(){
      this.getOfflineMessage()
    }
  }
</script>

<style scoped>

</style>
