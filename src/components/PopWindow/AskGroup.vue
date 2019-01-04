<template>
  <section class="panel panel-default pop-window" v-if="show">
    <header class="panel-heading font-bold" @mousedown="mousedown">
      <span>群申请</span>
      <span class="pull-right">
          <i class="icon icon-close pointer" @click="close"></i>
      </span>
    </header>
    <div class="panel-body no-padder">
      <header class="panel-heading bg-light">
        <div class="clearfix">
          <a href="#" class="pull-left thumb-md avatar b-3x m-r">
            <img src="../../assets/images/a1.png" alt="...">
          </a>
          <div class="clear">
            <div class="h3 m-t-xs m-b-xs">
              John.Smith
            </div>
            <small class="text-muted">20/300人</small>
          </div>
        </div>
      </header>
      <div class="list-group no-radius">
        <div class="list-group-item">
          <div class="form-group">
            <textarea  class="form-control" placeholder="输入申请理由" style="height: 100px"></textarea>
          </div>
        </div>
      </div>
      <div class="text-center m-b" style="position: absolute;bottom: 0;left: 50%;transform: translate3d(-50%,0,0)">
        <a class="btn btn-s-md btn-danger">取消</a>
        <a class="btn btn-s-md btn-success">申请</a>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        show: false,
        keyword: ''
      }
    },
    methods: {
      open(keyword) {
        this.show = true
        this.keyword = keyword
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
