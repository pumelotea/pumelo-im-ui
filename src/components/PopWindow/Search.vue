<template>
  <section class="panel panel-default pop-window" v-if="show">
    <header class="panel-heading font-bold" @mousedown="mousedown">
      <span>发现好友、群组</span>
      <span class="pull-right">
          <i class="icon icon-close pointer" @click="close"></i>
      </span>
    </header>
    <div class="panel-body">
      <div class="form-group">
        <div class="input-group">
          <input type="text" class="form-control" v-model="keyword" placeholder="支持ID 昵称"/>
          <span class="input-group-btn">
              <a class="btn btn-s-sm btn-default" @click="searchUser(0)">搜索</a>
            </span>
        </div>
      </div>
      <div class="scrollable" style="position: relative;height: 260px;overflow: auto">
        <div class="h5" style="padding: 5px"> 发现的好友</div>
        <ul class="list-group alt">
          <li class="list-group-item" v-for="user in userSearchResult" v-if="user.uid != $api.getUid()">
            <div class="media">
              <span class="pull-left thumb-sm"><img src="../../assets/images/a0.png" alt="John said" class="img-circle"></span>
              <div class="pull-right  m-t-sm">
                <i class="icon icon-plus text-info pointer" style="font-size: 20px" @click="openAskFriendPop(user)"></i>
              </div>
              <div class="media-body">
                <div><a href="#">{{user.name}}</a></div>
                <small class="text-muted">{{user.uid}}</small>
              </div>
            </div>
          </li>
        </ul>
        <div class="text-right m-r" v-show="userSearchResult.length>0">
          <JPAPage ref="userJpa" @on-page-number-changed="searchUser"></JPAPage>
        </div>
        <div class="text-center" v-show="userSearchResult.length==0">
          <span class="h4 text-info-dk" >未发现相关好友</span>
        </div>
        <div class="h5" style="padding: 5px"> 发现的群组</div>
        <ul class="list-group alt">
          <li class="list-group-item">
            <div class="media">
              <span class="pull-left thumb-sm"><img src="../../assets/images/a0.png" alt="John said" class="img-circle"></span>
              <div class="pull-right  m-t-sm">
                <i class="icon icon-plus text-info pointer" style="font-size: 20px" @click="openAskGroupPop"></i>
              </div>
              <div class="media-body">
                <div><a href="#">Chris Fox</a></div>
                <small class="text-muted">about 2 minutes ago</small>
              </div>
            </div>
          </li>
          <li class="list-group-item">
            <div class="media">
              <span class="pull-left thumb-sm"><img src="../../assets/images/a0.png" alt="John said" class="img-circle"></span>
              <div class="pull-right  text-muted m-t-sm">
                <i class="icon icon-plus text-info pointer" style="font-size: 20px"></i>
              </div>
              <div class="media-body">
                <div><a href="#">Amanda Conlan</a></div>
                <small class="text-muted">about 2 hours ago</small>
              </div>
            </div>
          </li>
          <li class="list-group-item">
            <div class="media">
              <span class="pull-left thumb-sm"><img src="../../assets/images/a0.png" alt="John said" class="img-circle"></span>
              <div class="pull-right  m-t-sm">
                <i class="icon icon-plus text-info pointer" style="font-size: 20px"></i>
              </div>
              <div class="media-body">
                <div><a href="#">Dan Doorack</a></div>
                <small class="text-muted">3 days ago</small>
              </div>
            </div>
          </li>
          <li class="list-group-item">
            <div class="media">
              <span class="pull-left thumb-sm"><img src="../../assets/images/a0.png" alt="John said" class="img-circle"></span>
              <div class="pull-right m-t-sm">
                <i class="icon icon-plus text-info pointer" style="font-size: 20px"></i>
              </div>
              <div class="media-body">
                <div><a href="#">Lauren Taylor</a></div>
                <small class="text-muted">about 2 minutes ago</small>
              </div>
            </div>
          </li>
        </ul>
        <div class="text-right m-r">
          <ul class="pagination pagination-sm" style="margin: auto">
            <li><a href="#"><i class="fa fa-chevron-left"></i></a></li>
            <li><a href="#"><i class="fa fa-chevron-right"></i></a></li>
          </ul>
        </div>
      </div>
    </div>
    <AskFriend ref="askFriendPop"></AskFriend>
    <AskGroup ref="askGroupPop"></AskGroup>
  </section>
</template>

<script>
  import AskFriend from '@/components/PopWindow/AskFriend'
  import AskGroup from '@/components/PopWindow/AskGroup'
  import JPAPage from '@/components//JPAPagination.vue'
  export default {
    components:{
      AskFriend,AskGroup,JPAPage
    },
    data() {
      return {
        show: false,
        keyword: '',
        userSearchResult:[]
      }
    },
    methods: {
      open(keyword) {
        this.show = true
        this.keyword = keyword
        this.searchUser(0)
      },
      close() {
        this.show = false
      },
      openAskFriendPop(model){
        this.$refs.askFriendPop.open(model)
      },
      openAskGroupPop(){
        this.$refs.askGroupPop.open()
      },
      mousedown(event) {
        this.selectElement = this.$el
        var div1 = this.selectElement
        this.selectElement.style.cursor = 'move'
        this.isDowm = true
        var distanceX = event.clientX - this.selectElement.offsetLeft
        var distanceY = event.clientY - this.selectElement.offsetTop
        // alert(distanceX)
        // alert(distanceY)
        console.log(distanceX)
        console.log(distanceY)
        document.onmousemove = function (ev) {
          var oevent = ev || event
          div1.style.left = oevent.clientX - distanceX + 'px'
          div1.style.top = oevent.clientY - distanceY + 'px'
        }
        document.onmouseup = function () {
          document.onmousemove = null
          document.onmouseup = null
          div1.style.cursor = 'default'
        }
      },
      searchUser(index){
        if (this.keyword === ''){
          this.$toast.error({
            title:'输入提示',
            message:'请输入1个字符以上',
          })
          return
        }
        this.$api.searchUser(this.keyword,index,5).then(res=>{
          if (res.code === 200){
            this.userSearchResult = res.data.content
            this.$refs.userJpa.setData(index,res.data.totalPages)
          }else {
            this.$toast.error({
              title:'查询提示',
              message:'搜索失败',
            })
          }
        },err=>{})
      }
    }
  }
</script>

<style scoped>
  .pop-window {
    width: 600px;
    height: 400px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    z-index: 99999;
    box-shadow: 0 10px 20px 0px rgba(0, 0, 0, 0.4);
  }
</style>
