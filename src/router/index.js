import Vue from 'vue'
import VueRouter from 'vue-router'
import Talk from 'views/talk/Talk'
import Goods from 'views/goods/Goods'
import Mine from 'views/mine/Mine'
import Roommates from 'views/roommates/Roommates'
import Main from 'views/main/Main'
import Login from 'components/content/login/Login'
import Regist from 'components/content/regist/Regist'
import Guide from 'views/guide/Guide'
import addGoods from 'views/goods/child/addGoods'
Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/guide'
  },
  {
    path: '/guide',
    name: 'Guide',
    component: Guide,
    redirect: '/guide/login',
    children: [
      {
        path: 'login',
        name: 'Login',
        component: Login
      },
      {
        path: 'regist',
        name: 'Regist',
        component: Regist
      }
    ]
  },
  {
    path: '/main',
    name: 'Main',
    component: Main,
    redirect: '/main/talk',
    children: [
      {
        path: 'talk',
        name: 'Talk',
        component: Talk
      },
      {
        path: 'goods',
        name: 'Goods',
        component: Goods
      },
      {
        path: 'mine',
        name: 'Mine',
        component: Mine
      },
      {
        path: 'roommates',
        name: 'Roommates',
        component: Roommates
      },
      {
        path: 'addGoods',
        name: 'AddGoods',
        component: addGoods
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
