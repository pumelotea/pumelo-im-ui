import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout/Layout'
import ChatView from '@/views/chat'
import LoginView from '@/views/login'
import RegisterView from '@/views/register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/',
          component: ChatView
        }
      ]
    },
    {
      path: '/login',
      component: LoginView,
    },
    {
      path: '/register',
      component: RegisterView,
    },

  ]
})
