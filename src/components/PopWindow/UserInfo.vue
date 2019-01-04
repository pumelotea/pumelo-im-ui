<template>
  <section class="panel panel-default pop-window" v-if="show">
    <header class="panel-heading font-bold" @mousedown="mousedown">
      <span>好友信息</span>
      <span class="pull-right">
          <i class="icon icon-close pointer" @click="close"></i>
      </span>
    </header>
    <div class="panel-body" v-if="model">
      <div class="clearfix text-center m-t">
        <div class="inline">
          <div class="easypiechart easyPieChart" data-percent="75" data-line-width="5" data-bar-color="#4cc0c1" data-track-color="#f5f5f5" data-scale-color="false" data-size="134" data-line-cap="butt" data-animate="1000" style="width: 134px; height: 134px; line-height: 134px;">
            <div class="thumb-lg">
              <img src="../../assets/images/m9.jpg" class="img-circle" alt="...">
            </div>
            <canvas width="268" height="268" style="width: 134px; height: 134px;"></canvas></div>
          <div class="h4 m-t">{{model.remark}}</div>
          <div class="h4 m-t m-b-xs">{{model.name}}</div>
        </div>
        <div> <small class="text-muted m-b">ID:{{model.uid}}</small></div>
      </div>
      <div class="m-b"  style="position: absolute;bottom: 0;left: 50%;transform: translate3d(-50%,0,0)">
        <div class="m-b-sm">
          <a class="btn btn-s-xl btn-success" @click="openVideoChat()">视频通话</a>
        </div>
        <div class="m-b-sm">
          <a class="btn btn-s-xl btn-info" @click="openRemark">备注</a>
        </div>
        <div>
          <a class="btn btn-s-xl btn-danger" @click="openDelete">删除</a>
        </div>
      </div>
    </div>
    <RemarkFriend ref="remarkUserPop" @success="updated"></RemarkFriend>
    <DeleteFriend ref="deleteUserPop" @success="close"></DeleteFriend>
  </section>
</template>

<script>
  import RemarkFriend from '@/components/PopWindow/RemarkFriend'
  import DeleteFriend from '@/components/PopWindow/DeleteFriend'
  export default {
    components:{
      RemarkFriend,DeleteFriend
    },
    data(){
      return{
        show:false,
        uid:'',
        model:null,
      }
    },
    methods:{
      open(uid){
        this.show = true
        this.uid = uid
        this.getFriend()
      },
      close(){
        this.show = false
      },
      getFriend(){
        this.$api.getFriend(this.uid).then(res=>{
          if (res.code === 200){
            this.model = res.data
          }
        },err=>{})
      },
      openRemark(){
        this.$refs.remarkUserPop.open(this.uid)
      },
      openDelete(){
        this.$refs.deleteUserPop.open(this.uid)
      },
      openVideoChat(){
        this.$vtalk.call(this.uid)
      },
      updated(){
        this.getFriend()
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
        document.onmousemove = function (ev) {
          var oevent = ev || event
          div1.style.left = oevent.clientX - distanceX + 'px'
          // div1.style.top = oevent.clientY - distanceY + 'px'
        }
        document.onmouseup = function () {
          document.onmousemove = null
          document.onmouseup = null
          div1.style.cursor = 'default'
        }
      }
    }
  }
</script>

<style scoped>
  .pop-window {
    width: 280px;
    height: 100%;
    position: fixed !important;
    left: 0;
    top: 0;
    z-index: 9999;
    border-radius: 0 !important;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.3);
    /*background: url("../../../static/img/IMG_1462.jpg") ;*/
    /*background-size: auto 100%;*/
    /*background-position: center;*/
  }
</style>
