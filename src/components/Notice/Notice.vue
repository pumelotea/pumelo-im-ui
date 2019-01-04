<template>
  <section class="panel panel-info animated slideInRight m-b-xs" v-if="show">
    <div class="panel-body" style="padding: 10px">
      <a href="#" class="thumb pull-right m-l m-t-xs avatar">
        <img src="../../assets/images/a4.png" alt="...">
      </a>
      <div class="clear">
        <a href="#" class="text-info">@Mike Mcalidek <i class="icon-twitter"></i></a>
        <small class="block text-muted">2,415 followers / 225 tweets</small>
        <a href="#" class="btn btn-xs btn-success m-t-xs">Follow</a>
        <a href="#" class="btn btn-xs btn-success m-t-xs">Follow</a>
      </div>
    </div>
  </section>
</template>

<script>
    export default {
      data(){
        return {
          show:false,
          timer: null,
          content:''
        }
      },
      methods:{
        startTime(){
          this.show = true;
          if(this.timer){
            clearTimeOut(this.timer)
          }else{
            this.timer = setTimeout(()=>{
              this.show = false
              setTimeout(()=>{
                this.$el.remove()
                this.$destroy()
              },2000)
            }, 3000);
          }
        }
      },
      mounted(){
        this.startTime();
      }

    }
</script>

<style scoped>

</style>
