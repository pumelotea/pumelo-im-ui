<template>
  <section class="vbox" style="height: 100vh">
    <head-bar></head-bar>
    <section>
      <section class="hbox stretch">
        <!-- .aside -->
        <aside class="bg-black dk aside hidden-print" style="width: 280px;">
          <div style="float: left;width: 70px;height: 100%;padding-top: 10px" class="bg-black text-center pointer">
            <div style="padding-top: 15px;padding-bottom: 15px">
              <a :style="currentTab === 'msg'?'color:white':''" @click="changeTab('msg')"  data-toggle="tab">
                <i class="icon icon-bubble" style="font-size: 25px"></i>
              </a>
            </div>
            <div  style="padding-top: 15px;padding-bottom: 15px">
              <a :style="currentTab === 'contact'?'color:white':''" @click="changeTab('contact')" data-toggle="tab">
                <i class="icon  icon-user" style="font-size: 24px"></i>
              </a>
            </div>
            <div  style="padding-top: 15px;padding-bottom: 15px">
              <a :style="currentTab === 'group'?'color:white':''" @click="changeTab('group')"  data-toggle="tab">
                <i class="icon icon-bubbles " style="font-size: 26px"></i>
              </a>
            </div>



          </div>
          <div style="height: 100%;float: right;width: 210px">
            <section class="vbox" >
              <section class=" scrollable">
                <div class="slim-scroll" data-height="auto" data-disable-fade-out="true">
                  <!-- nav -->
                  <section id="msg" class="fadeInRight" :class="currentTab === 'msg'?'':'hidden'">
                    <section class="scrollable hover">
                      <div class="text-center text-md m-t-lg" v-if="$msg.isNoneMsg()">暂无消息</div>
                      <ul class="list-group no-borders auto" style="border-radius: 0">
                        <li class="list-group-item msg-item" v-for="item,id in messageMap" v-if="item.list.length>0" @click="$msg.activePop(id)">
                          <a href="#" style="width: 100%;border-radius: 0" >
                          <span class="pull-left thumb-xs m-t-xs avatar m-l-xs m-r-sm">
                            <img src="../../assets/images/a1.png" alt="..." class="img-circle">
                          </span>
                            <div class="pull-right text-success m-t-sm" v-if="item.unreadCount>0">
                              <span class="badge bg-danger">{{item.unreadCount}}</span>
                            </div>
                            <div class="media-body">
                              <div><a href="#">{{$api.getUserName(id)}}</a></div>
                              <small class="text-muted">{{item.list[item.list.length-1].content.length>10?item.list[item.list.length-1].content.substring(0,9)+'...':item.list[item.list.length-1].content}}</small>
                            </div>
                          </a>
                        </li>
                      </ul>
                    </section>
                  </section>
                  <section id="contact" class="fadeInRight" :class="currentTab === 'contact'?'':'hidden'">
                    <section class="scrollable hover">
                      <div class="text-center text-md m-t-lg" v-if="$api.isNoneFriend()">暂无好友</div>
                      <ul class="list-group no-borders auto no-radius" >
                        <li class="list-group-item msg-item" v-for="user in $api.store.state.friendList" @click.stop="openNewChat(user.uid)">
                          <a href="#" style="width: 100%;border-radius: 0" >
                          <span class="pull-left thumb-xs m-t-xs avatar m-l-xs m-r-sm">
                            <img src="../../assets/images/a1.png" alt="..." class="img-circle">
                            <!--<i class="on b-light right sm"></i>-->
                          </span>
                            <div class="pull-right m-t-sm">
                              <a @click.stop="openUserInfoPop(user.uid)"><i class="icon icon-info"></i></a>
                              <a class="m-l-xs" @click.stop="$vtalk.call(user.uid)"><i class="icon icon-camcorder"></i></a>
                            </div>
                            <div class="media-body">
                              <div><a href="#">{{user.remark == null ||user.remark === '' ? user.name:user.remark }}</a></div>
                              <small class="text-muted">{{user.uid}}</small>
                            </div>
                          </a>
                        </li>
                      </ul>
                    </section>
                  </section>
                  <section id="group" class="fadeInRight" :class="currentTab === 'group'?'':'hidden'">
                    <section class="scrollable hover">
                      <ul class="list-group no-borders auto" style="border-radius: 0">
                        <li class="list-group-item msg-item">
                          <a href="#" style="width: 100%;border-radius: 0">
                          <span class="pull-left thumb-xs m-t-xs avatar m-l-xs m-r-sm">
                            <img src="../../assets/images/a1.png" alt="..." class="img-circle">
                          </span>
                            <div class="media-body">
                              <div><a href="#">Chris Fox</a></div>
                              <small class="text-muted">about 2 minutes ago</small>
                            </div>
                          </a>
                        </li>
                        <li class="list-group-item msg-item">
                          <a href="#" style="width: 100%;border-radius: 0">
                          <span class="pull-left thumb-xs m-t-xs avatar m-l-xs m-r-sm">
                            <img src="../../assets/images/a1.png" alt="..." class="img-circle">
                          </span>
                            <div class="media-body">
                              <div><a href="#">Chris Fox</a></div>
                              <small class="text-muted">about 2 minutes ago</small>
                            </div>
                          </a>
                        </li>

                      </ul>
                    </section>
                  </section>
                  <!-- / nav -->
                </div>
              </section>
            </section>
          </div>
        </aside>
        <!-- /.aside -->
        <section id="content">
          <router-view></router-view>
          <a href="#" class="hide nav-off-screen-block" data-toggle="class:nav-off-screen,open"
             data-target="#nav,html"></a>
        </section>
      </section>
      <user-info ref="userInfoPop"></user-info>
      <VideoTalk ref="videoTalkPop"></VideoTalk>
    </section>
  </section>
</template>

<script>
  import headBar from '../../components/HeadBar/HeadBar'
  import {parseTime} from "../../utils";
  import UserInfo from '../../components/PopWindow/UserInfo'
  import GroupInfo from '../../components/PopWindow/GroupInfo'
  import Delete from '../../components/PopWindow/Delete'
  import Remark from '../../components/PopWindow/Remark'
  import AskFriend from '../../components/PopWindow/AskFriend'
  import AskFriendPreview from '../../components/PopWindow/AskFriendPreview'
  import AskGroup from '../../components/PopWindow/AskGroup'
  import AskGroupPreview from '../../components/PopWindow/AskGroupPreview'
  import VideoTalk from '../../components/PopWindow/VideoTalk'
  export default {
    name: 'Layout',
    components: {
      headBar,UserInfo,GroupInfo,Delete,Remark,AskFriend,AskGroup,AskFriendPreview,AskGroupPreview,VideoTalk
    },
    data() {
      return {
        currentTab:'msg',
      }
    },
    computed:{
      messageMap(){
        return this.$msg.store.state.messageMap
      }
    },
    methods: {
      changeTab(tab){
        this.currentTab = tab
      },
      formatTime(time) {
        return parseTime(time)
      },
      getFriendList(){
        this.$api.getFriendList().then(res=>{
          if (res.code === 200){
            for(let e of res.data){
              this.$set(this.$api.store.state.friendList,e.uid,e)
            }
            this.$msg.connect()
            //获取离线消息预览
            this.getOfflineMessagePreview()
          }
        },err=>{})
      },
      openUserInfoPop(uid){
        this.$refs.userInfoPop.open(uid)
      },
      openNewChat(uid){
        if (this.$msg.isNewChater(uid)){
          this.$msg.createNewChaterMem(uid)
        }
        this.$msg.activePop(uid)
      },
      getOfflineMessagePreview(){
        this.$api.getOfflineMessagePreview().then(res=>{
          if(res.code === 200){
            this.$msg.putOfflineMessagePreview(res.data)
          }
        },err=>{})
      },
    },
    mounted() {
      document.body.setAttribute('class', '')
      this.getFriendList()
    }
  }
</script>
<style>
  .msg-item {
    border-radius: 0;
  }

  .msg-item:hover {
    box-shadow: 0 5px 20px 6px rgba(0, 0, 0, 0.61);
    border-radius: 0;
  }

  .hidden{
    display: none;
  }

  .toast-icon {
    display: none;
  }

  .cxlt-toastr-container>div{
    padding-left: 10px;
  }

</style>

