<template>
  <section class="panel panel-info animated slideInRight m-b-xs" style="width: 260px" v-if="show">
    <div class="panel-body" style="padding: 10px">
      <a href="#" class="thumb pull-right m-l m-t-xs avatar">
        <img src="../../assets/images/a4.png" alt="...">
      </a>
      <div class="clear">
        <a href="#" class="text-info">{{name}}</a>
        <small class="block text-muted">视频通话</small>
        <a href="#" class="btn btn-xs btn-success m-t-xs" @click="$vtalk.take();show=false">接听</a>
        <a href="#" class="btn btn-xs btn-danger m-t-xs" @click="$vtalk.close();show=false">拒绝</a>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        show: false,
        timer: null,
        name: ''
      }
    },
    methods: {
      startTime() {
        this.show = true;
        if (this.timer) {
          clearTimeOut(this.timer)
        } else {
          this.timer = setTimeout(() => {
            this.show = false
            setTimeout(() => {
              this.$vtalk.close()
              this.$el.remove()
              this.$destroy()
            }, 20000)
          }, 21000);
        }
      }
    },
    mounted() {
      this.startTime();
    }

  }
</script>

<style scoped>

</style>
