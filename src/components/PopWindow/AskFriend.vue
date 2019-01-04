<template>
  <section class="panel panel-default pop-window" v-if="show">
    <header class="panel-heading font-bold" @mousedown="mousedown">
      <span>好友添加</span>
      <span class="pull-right">
          <i class="icon icon-close pointer" @click="close"></i>
      </span>
    </header>
    <div class="panel-body no-padder" v-if="model">
      <header class="panel-heading bg-light">
        <div class="clearfix">
          <a href="#" class="pull-left thumb-md avatar b-3x m-r">
            <img src="../../assets/images/a1.png" alt="...">
          </a>
          <div class="clear">
            <div class="h3 m-t-xs m-b-xs">
              {{model.name}}
            </div>
            <small class="text-muted"> {{model.uid}}</small>
          </div>
        </div>
      </header>
      <div class="list-group no-radius">
        <div class="list-group-item">
          <div class="form-group">
            <textarea v-model="reason" class="form-control" placeholder="输入申请理由" style="height: 100px"></textarea>
          </div>
        </div>
      </div>
      <div class="text-center m-b" style="position: absolute;bottom: 0;left: 50%;transform: translate3d(-50%,0,0)">
          <a class="btn btn-s-md btn-danger" @click="close">取消</a>
          <a class="btn btn-s-md btn-success" @click="ask">申请</a>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        show: false,
        model: null,
        reason:''
      }
    },
    methods: {
      open(model) {
        this.show = true
        this.model = model
      },
      close() {
        this.show = false
      },
      mousedown(event) {
        this.selectElement = this.$el
        var div1 = this.selectElement
        this.selectElement.style.cursor = 'move'
        this.isDowm = true
        var distanceX = event.clientX - this.selectElement.offsetLeft
        var distanceY = event.clientY - this.selectElement.offsetTop
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
      ask(){
        this.$api.askFriend(this.model.uid,this.reason).then(res=>{
          if (res.code === 200) {
            this.close()
          }else {
            this.$toast.error({
              title:'好友申请提示',
              message:res.message,
            })
          }
        },err=>{})
      }
    }
  }
</script>

<style scoped>
  .pop-window {
    width: 500px;
    height: 320px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%,-50%,0);
    z-index: 9999;
    border-radius: 0 !important;
    box-shadow: 0 10px 20px 0px rgba(0, 0, 0, 0.4);
  }
</style>
