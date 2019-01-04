<template>
  <section class="panel panel-default pop-window">
    <header class="panel-heading font-bold">设置备注</header>
    <div class="panel-body">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="输入备注">
        </div>
      <div class="text-center">
        <a class="btn btn-s-lg btn-success">保存</a>
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
    width: 300px;
    height: 170px;
    position: fixed !important;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%,-80%,0);
    z-index: 9999;
    border-radius: 0 !important;
  }
</style>
