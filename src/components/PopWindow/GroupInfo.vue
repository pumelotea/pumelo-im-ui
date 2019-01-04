<template>
  <section class="panel panel-default pop-window">
    <header class="panel-heading font-bold">
      <span>群信息</span>
      <span class="pull-right">
          <i class="icon icon-close"></i>
      </span>
    </header>
    <div class="panel-body">
      <div class="clearfix text-center m-t">
        <div class="inline">
          <div class="easypiechart easyPieChart" data-percent="75" data-line-width="5" data-bar-color="#4cc0c1" data-track-color="#f5f5f5" data-scale-color="false" data-size="134" data-line-cap="butt" data-animate="1000" style="width: 134px; height: 134px; line-height: 134px;">
            <div class="thumb-lg">
              <img src="../../assets/images/m3.jpg" class="img-circle" alt="...">
            </div>
            <canvas width="268" height="268" style="width: 134px; height: 134px;"></canvas></div>
          <div class="h4 m-t m-b-xs">IM交流群</div>
          <small class="text-muted m-b">1000/3000人</small>
        </div>
      </div>
      <div class="m-b"  style="position: absolute;bottom: 0;left: 50%;transform: translate3d(-50%,0,0)">
        <div class="m-b-sm">
          <a class="btn btn-s-xl btn-info">备注</a>
        </div>
        <div>
          <a class="btn btn-s-xl btn-danger">退出</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    data(){
      return{
        show:false
      }
    }
  }
</script>

<style scoped>
  .pop-window {
    width: 250px;
    height: 100%;
    position: fixed !important;
    left: 0;
    top: 0;
    z-index: 9999;
    border-radius: 0 !important;
    box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.3);
  }
</style>
