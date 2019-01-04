<template>
  <section class="panel panel-default pop-window">
    <header class="panel-heading font-bold">申请入群</header>
    <div class="panel-body no-padder">
      <header class="panel-heading bg-light">
        <div class="clearfix">
          <a href="#" class="pull-left thumb-md avatar b-3x m-r">
            <img src="../../assets/images/a1.png" alt="...">
          </a>
          <div class="clear">
            <div class="h3 m-t-xs m-b-xs">
              John.Smith
              <i class="fa fa-circle text-success pull-right text-xs m-t-sm"></i>
            </div>
            <small class="text-muted">Art director</small>
          </div>
        </div>
      </header>
      <div class="list-group no-radius">
        <div class="list-group-item">
          申请理由:ASDASDAKSJDH
        </div>
      </div>
      <div class="text-center m-b" style="position: absolute;bottom: 0;left: 50%;transform: translate3d(-50%,0,0)">
        <a class="btn btn-s-md btn-danger">拒绝</a>
        <a class="btn btn-s-md btn-success">同意</a>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
  }
</script>

<style scoped>
  .pop-window {
    width: 500px;
    height: 320px;
    position: fixed !important;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%,-80%,0);
    z-index: 9999;
    border-radius: 0 !important;
    box-shadow: 0 10px 20px 0px rgba(0, 0, 0, 0.4);
  }
</style>
