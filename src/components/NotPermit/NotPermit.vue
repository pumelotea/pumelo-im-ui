<template>
  <div>
    <section id="content">
      <div class="row m-n">
        <div class="col-sm-4 col-sm-offset-4">
          <div class="text-center m-b-lg">
            <h1 class="h text-white animated fadeInDownBig">401</h1>
          </div>
          <div class="list-group auto m-b-sm m-b-lg">
            <a class="list-group-item text-center">
              您无权访问该页面
            </a>
            <a href="/#/" class="list-group-item">
              <i class="fa fa-chevron-right icon-muted"></i>
              <i class="fa fa-fw fa-home icon-muted"></i> 回到首页
            </a>
            <a href="javascript:void(0);" class="list-group-item">
              <i class="fa fa-chevron-right icon-muted"></i>
              <i class="fa fa-fw fa-question icon-muted"></i> Send us a tip
            </a>
            <a href="javascript:void(0);" class="list-group-item">
              <i class="fa fa-chevron-right icon-muted"></i>
              <span class="badge bg-info lt">021-215-584</span>
              <i class="fa fa-fw fa-phone icon-muted"></i> Call us
            </a>
          </div>
        </div>
      </div>
    </section>
    <!-- footer -->
    <footer id="footer">
      <div class="text-center padder clearfix">
        <p>
          <small>PumeloAdmin UI<br>&copy; 2018</small>
        </p>
      </div>
    </footer>
  </div>
</template>
<script>
  export default {
    name: 'NotPermit',
    mounted(){
      document.body.setAttribute("class","bg-dark dker max-view");
    }
  }

</script>
