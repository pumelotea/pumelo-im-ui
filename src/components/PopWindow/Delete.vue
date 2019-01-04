<template>
  <section class="panel panel-default pop-window">
    <header class="panel-heading font-bold">删除确认</header>
    <div class="panel-body">
        <div class="checkbox i-checks text-center">
          <label>
            <input type="checkbox"><i></i> 同时在对方列表中删除
          </label>
        </div>
      <div class="text-center m-t-md">
        <a class="btn btn-s-lg btn-danger">删除</a>
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
    width: 260px;
    height: 170px;
    position: fixed !important;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%,-80%,0);
    z-index: 9999;
    border-radius: 0 !important;
  }
</style>
