<template>
  <header class="bg-white-only header header-md navbar navbar-fixed-top-xs">
    <div class="navbar-header aside bg-info dk text-center" style="width: 280px">
      <a class="navbar-brand text-lt bg-black pull-left" style="width: 70px">
        <a> <i class="icon-cup text-info-lt" style="font-size: 26px"></i></a>
      </a>
      <a class="navbar-brand text-lt">
        <span class="hidden-nav-xs">CUP TEA</span>
      </a>
    </div>
    <div class="navbar-form navbar-left input-s-lg m-t m-l-n-xs hidden-xs" role="search">
      <div class="form-group">
        <div class="input-group">
          <input type="text" class="form-control input-sm no-border rounded" v-model="keyword"
                 placeholder="搜索 好友,群组...">
          <span class="input-group-btn">
              <a class="btn btn-sm btn-icon search-btn" @click="openSearchPop"><i class="fa fa-search"></i></a>
          </span>
        </div>
      </div>
    </div>

    <div class="navbar-right ">
      <ul class="nav navbar-nav m-n hidden-xs nav-user user">
        <li class="hidden-xs">
          <a href="#" class="dropdown-toggle lt" data-toggle="dropdown">
            <i class="icon-bell"></i>
            <span class="badge badge-sm up bg-danger count"
                  v-if="sysMessageList.length>0">{{sysMessageList.length}}</span>
          </a>
          <section class="dropdown-menu aside-xl animated fadeInUp">
            <section class="panel bg-white">
              <div class="panel-heading b-light bg-light">
                <strong>您有 <span class="count">{{sysMessageList.length}}</span> 通知</strong>
              </div>
              <div class="list-group list-group-alt" style="max-height: 70vh;overflow: auto">
                <a href="#" class="media list-group-item"
                   v-for="item,index in sysMessageList"
                   v-if="item.contentType==='ASK_FRIEND'"
                    @click="openAskFriendPreview(item.content,index)"
                >
                    <span class="pull-left thumb-sm">
                      <img src="../../assets/images/m10.jpg" alt="..." class="img-circle">
                    </span>
                    <span class="media-body block m-b-none">
                      <label class="label label-success">好友申请通知</label><br>
                      <div style="margin-top: 5px">
                        <small class="text-muted" >{{item.content.name}}想加你为好友  {{formatTime(item.sentAt)}}</small>
                      </div>
                    </span>
                </a>
                <a href="#" class="media list-group-item" v-for="item in sysMessageList" v-if="item.contentType!=='ASK_FRIEND'"

                >
                    <span class="pull-left thumb-sm">
                      <img src="../../assets/images/m10.jpg" alt="..." class="img-circle">
                    </span>
                  <span class="media-body block m-b-none">
                      <label class="label label-info">通知</label> {{formatTime(item.sentAt)}}<br>
                      <small class="text-muted" >{{item.content}}</small>
                    </span>
                </a>
              </div>
              <div class="panel-footer text-sm">
                <a href="#" class="pull-right"><i class="fa fa-cog"></i></a>
                <a href="#" data-toggle="class:show animated fadeInRight" @click="$msg.cleanSysMessage()">清空通知</a>
              </div>
            </section>
          </section>
        </li>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle bg clear" data-toggle="dropdown">
              <span class="thumb-sm avatar pull-right m-t-n-sm m-b-n-sm m-l-sm">
                <img src="../../assets/images/a0.png" alt="...">
              </span>
            {{ $api.getName() }} <b class="caret"></b>
          </a>
          <ul class="dropdown-menu animated fadeInRight">
            <li>
              <span class="arrow top"></span>
              <a href="#">个性设置</a>
            </li>
            <li>
              <a href="#">
                <span class="badge bg-danger pull-right">3</span>
                消息通知
              </a>
            </li>
            <li class="divider"></li>
            <li>
              <a href="javascript:void(0);" @click="logout">退出</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <search ref="searchPop"></search>
    <ask-friend-preview ref="askFriendPreview"></ask-friend-preview>
  </header>
</template>

<script>
  import Search from '@/components/PopWindow/Search'
  import AskFriendPreview from '@/components/PopWindow/AskFriendPreview'
  import {formatTime} from "@/utils";

  export default {
    name: 'HeadBar',
    components: {
      Search,AskFriendPreview
    },
    data() {
      return {
        keyword: ''
      }
    },
    computed: {
      sysMessageList() {
        return this.$msg.store.state.sysMessage
      }
    },
    methods: {
      openSearchPop() {
        this.$refs.searchPop.open(this.keyword)
      },
      formatTime(time){
        return formatTime(time)
      },
      openAskFriendPreview(model){
        this.$refs.askFriendPreview.open(model)
      },
      logout(){
        this.$api.logout().then(res=>{
          this.$api.cleanLoginStatus()
          this.$api.cleanFriendList()
          this.$msg.cleanMsg()
          this.$router.push({path:'/login'})
        },err=>{})
      }
    },
    mounted() {
      this.$api.getReviewAskList().then(res=>{
        if (res.code === 200) {
          for(let e of res.data){
            this.$msg.store.state.sysMessage.push({
              msgType:'SYS',
              from:'SYS',
              sentAt:e.createdAt,
              content:e,
              contentType:'ASK_FRIEND',
            })
          }
        }
      },err=>{})
    }
  }
</script>
<style scoped>
  .search-btn:active {
    background: #ffffff !important;
    box-shadow: none;
  }
</style>
