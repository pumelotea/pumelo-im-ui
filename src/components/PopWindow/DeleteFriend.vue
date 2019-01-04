<template>
  <section class="panel panel-default pop-window" v-if="show">
    <header class="panel-heading font-bold" @mousedown="mousedown">
      <span>删除确认</span>
      <span class="pull-right">
          <i class="icon icon-close pointer" @click="close"></i>
      </span>
    </header>
    <div class="panel-body">
        <div class="checkbox i-checks text-center">
          <label>
            <input type="checkbox" v-model="both"><i></i> 同时在对方列表中删除
          </label>
        </div>
      <div class="text-center m-t-md">
        <a class="btn btn-s-lg btn-danger" @click="deleteFriend">删除</a>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        show: false,
        uid: '',
        both:false
      }
    },
    methods: {
      open(uid) {
        this.show = true
        this.uid = uid
      },
      close() {
        this.show = false
      },
      deleteFriend(){
        this.$api.deleteFriend(this.uid,this.both).then(res=>{
          if (res.code === 200) {
            this.$emit('success')
            this.close()
          }else {
            this.$toast.error({
              title:'好友删除提示',
              message:res.message,
            })
          }
        },err=>{})
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
    width: 260px;
    height: 170px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%,-80%,0);
    z-index: 9999;
    border-radius: 0 !important;
    box-shadow: 0 10px 20px 0px rgba(0, 0, 0, 0.4);
  }
</style>
