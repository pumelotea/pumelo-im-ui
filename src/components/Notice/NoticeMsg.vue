<template>
  <section class="panel panel-info animated slideInRight m-b-xs" style="width: 260px" v-if="show">
    <div class="panel-body" style="padding: 10px">
      <a href="#" class="thumb pull-right m-l m-t-xs avatar">
        <img src="../../assets/images/a4.png" alt="...">
      </a>
      <div class="clear">
        <a href="#" class="text-info">{{name}}</a>
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
        name: '',
        msg:''
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
