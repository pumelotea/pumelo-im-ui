<template>
  <div>
    <section id="content" class="m-t-lg wrapper-md animated fadeInDown">
      <div class="container aside-xl text-center">
        <i class="icon-cup icon i-5x"></i>
        <section class="m-b-lg">
          <header class="wrapper text-center">
            <a class="navbar-brand block" href="/"><span class="h1">CUP TEA</span></a>
          </header>
          <div v-if="model">
            <section>
              <div  >
                <div class="text-center"><span class="text-success h4">恭喜您<br/>注册成功</span></div>
                <div class="clearfix text-center m-t">
                  <div class="inline">
                    <div class="thumb-lg">
                      <img src="../../assets/images/m0.jpg" class="img-circle" alt="...">
                    </div>
                    <div class="h4 m-t m-b-xs">{{model.name}}</div>
                    <small class="text-muted m-b">您的ID:{{model.uid}}</small>
                  </div>
                </div>
              </div>
              <a href="javascript:void(0);" class="btn btn-lg btn-info btn-block btn-rounded m-t  " @click="login">登 录</a>
            </section>
          </div>
          <div v-if="model ===null  ">
            <div class="form-group">
              <input v-model="name" placeholder="姓名" class="form-control rounded input-lg text-center no-border">
            </div>
            <!--<div class="form-group">-->
            <!--<input type="email" placeholder="邮箱" class="form-control rounded input-lg text-center no-border">-->
            <!--</div>-->
            <div class="form-group">
              <input v-model="password" type="password" placeholder="密码" class="form-control rounded input-lg text-center no-border">
            </div>
            <div class="checkbox i-checks m-b">
              <label class="m-l">
                <input type="checkbox" checked=""><i></i> 同意 <a href="#">注册协议</a>
              </label>
            </div>
            <a href="javascript:void(0)" class="btn btn-lg btn-warning lt b-white b-2x btn-block btn-rounded"
               @click="register"><i class="icon-arrow-right pull-right"></i><span class="m-r-n-md">注 册</span></a>
            <div class="line line-dashed"></div>
            <p class="text-muted text-center">
              <small>已经有账号?</small>
            </p>
            <a href="javascript:void(0);" class="btn btn-lg btn-info btn-block btn-rounded" @click="login">登 录</a>
          </div>
        </section>
      </div>
    </section>
    <!-- footer -->
    <footer id="footer">
      <div class="text-center padder clearfix">
        <p>
          <small>pumelo.io<br>&copy; 2018</small>
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
  export default {
    name: 'Register',
    data() {
      return {
        name: '',
        password: '',
        model:null,
      }
    },
    methods: {
      login: function () {
        this.$router.push({path: '/login'})
      },
      register: function () {
        if (this.name === '' || this.password === ''){
          this.$toast.error({
            title:'注册提示',
            message:'请输入完整'
          })
          return
        }
        this.$api.register(this.name,this.password).then(res=>{
         if (res.code === 200) {
           this.model=res.data
           // this.$router.push({path: '/login'})
         }
        },err=>{})
      }
    },
    mounted() {
      document.body.setAttribute("class", "bg-dark dker max-view");
      if (this.$api.isLogin()){
        this.$router.push({path:'/'})
      }
    }
  }
</script>
<style>
  .toast-icon {
    display: none;
  }

  .cxlt-toastr-container>div{
    padding-left: 10px;
  }
</style>
