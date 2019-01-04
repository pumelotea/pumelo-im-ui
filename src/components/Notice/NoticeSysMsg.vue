<template>
  <section class="panel panel-info animated slideInRight m-b-xs" style="width: 260px" v-if="show">
    <div class="panel-body" style="padding: 10px">
      <div class="clear">
        <i class="icon icon-close pull-right pointer" style="margin-top: 2px"></i>
        <a href="#" class="text-info">系统消息</a>
        <small class="block text-muted">{{msg}}</small>
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
        msg:'',
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
              this.$el.remove()
              this.$destroy()
            }, 2000)
          }, 3000);
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
