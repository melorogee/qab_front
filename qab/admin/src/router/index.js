import Vue from 'vue'
import VueRouter from 'vue-router'

import Website from './website'
import Train from './train'
import Question from './question'
import Order from './order'
import Basic from './basic'
import Finance from './finance'
import User from './user'
import System from './system'
import Employee from './employee'
import Safety from './safety'


Vue.use(VueRouter)
const routes = [
  { 
    path: '/',
    component: () => import('@/components/Layout'),
    redirect: '/Login',
    children: [
      // { path: '/Home', name: 'Home', component: () => import('@/views/Home'), meta: { title: '首页', icon: 'home' } },
      Website, // 官网模块 3
      Train, // 培训库模块 2
      Question, // 题库模块 2
      Basic, // 基础数据模块 2
      Order, // 订单模块 2
      Finance, // 财务模块 1
      User, // 用户模块 2
      Employee,
        Safety,
      System, // 系统模块 2,

    ]
  },
  { path: '*', redirect: '/404' },
  { path: '/404', name: '404', component: () => import('@/views/error/404'), meta: { title: '404' } },
  { path: '/401', name: '401', component: () => import('@/views/error/401'), meta: { title: '401' } },
  { path: '/Login', name: 'Login', component: () => import('@/views/Login'), meta: { title: '登录' } },
  { path: '/GetPw', name: 'GetPw', component: () => import('@/views/GetPw'), meta: { title: '找回密码' } }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
