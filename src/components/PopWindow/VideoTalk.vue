<template>
  <section class="panel panel-default pop-window" v-if="$vtalk.store.state.isShow" @mousedown="mousedown">
    <div class="panel-body no-padder">
      <video id="localVideo" class="localVideo" autoplay></video>
      <video id="remoteVideo" class="remoteVideo" autoplay></video>


      <div class="text-center m-b" style="position: absolute;bottom: 0;left: 50%;transform: translate3d(-50%,0,0)">
        <a class="btn btn-s-md btn-danger" @click="$vtalk.close()">挂断</a>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    methods: {
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
      }
    }
  }
</script>

<style scoped>
  .pop-window {
    width: 800px;
    height: 600px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    z-index: 9999;
    border-radius: 0 !important;
    box-shadow: 0 10px 20px 0px rgba(0, 0, 0, 0.4);
    border: none;
  }

  .localVideo {
    width: 800px;
    height: 600px;
    background: black;
    transform: rotateY(180deg);
  }

  .remoteVideo {
    width: 267px;
    height: 200px;
    background: black;
    transform: rotateY(180deg);
    position: absolute;
    bottom: 0;
    right: 0;
  }
</style>
