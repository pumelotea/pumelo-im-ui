<template>
  <div>
    <section id="content" class="m-t-lg wrapper-md animated fadeInUp">
    <div class="container aside-xl text-center">
      <i class="icon-cup icon i-5x"></i>
      <section class="m-b-lg">
        <header class="wrapper text-center">
          <a class="navbar-brand block" href="/"><span class="h1">CUP TEA</span></a>
        </header>
        <div>
          <div class="form-group">
            <input v-model="username" type="email" placeholder="用户名" class="form-control rounded input-lg text-center no-border">
          </div>
          <div class="form-group">
             <input v-model="password" type="password" placeholder="密码" class="form-control rounded input-lg text-center no-border">
          </div>
          <a class="btn btn-lg btn-warning lt b-white b-2x btn-block btn-rounded" @click="login()"><i class="icon-arrow-right pull-right"></i><span class="m-r-n-md">登 录</span></a>
          <div class="text-center m-t m-b"><a href="#"><small>忘记密码?</small></a></div>
          <div class="line line-dashed"></div>
          <p class="text-muted text-center"><small>还没有账号吗?</small></p>
          <a href="javascript:void(0)" class="btn btn-lg btn-info btn-block rounded" @click="register">创建账号</a>
        </div>
      </section>
    </div>
  </section>
  <!-- footer -->
  <footer id="footer">
    <div class="text-center padder">
      <p>
        <small>pumelo.io<br>&copy; 2018</small>
      </p>
    </div>
  </footer>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login: function () {
      if (this.username === '' || this.password === ''){
        this.$toast.error({
          title:'登录提示',
          message:'请输入完整'
        })
        return
      }
      this.$api.login(this.username,this.password).then(res=>{
        if (res.code ===200){
          this.$api.setToken(res.data.accessToken,res.data.userVo)
          this.$router.push({path: '/'})
        }else {
          this.$toast.error({
            title:'登录提示',
            message:res.message
          })
        }
      },err=>{})
    },
    register: function () {
      this.$router.push({path: '/register'})
    }
  },
  mounted(){
    document.body.setAttribute("class","bg-dark dker max-view");
    if (this.$api.isLogin()){
      this.$router.push({path:'/'})
    }
  }
}
</script>
