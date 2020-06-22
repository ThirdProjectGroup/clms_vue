import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  // 首页
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '后台首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/acl',
    component: Layout,
    redirect: '/acl/user/list',
    name: '权限管理',
    meta: { title: '权限管理', icon: 'chart' },
    children: [
      {
        path: 'user/list',
        name: '系统用户管理',
        component: () => import('@/views/acl/user/list'),
        meta: { title: '系统用户管理' }
      },
      {
        path: 'role/list',
        name: '角色管理',
        component: () => import('@/views/acl/role/list'),
        meta: { title: '角色管理' }
      },
      {
        path: 'role/add',
        name: '角色添加',
        component: () => import('@/views/acl/role/form'),
        meta: { title: '角色添加' },
        hidden: true
      },
      {
        path: 'role/update/:id',
        name: '角色修改',
        component: () => import('@/views/acl/role/form'),
        meta: { title: '角色修改' },
        hidden: true
      },
      {
        path: 'role/distribution/:id',
        name: '角色权限',
        component: () => import('@/views/acl/role/roleForm'),
        meta: { title: '角色权限' },
        hidden: true
      },
      {
        path: 'menu/list',
        name: '菜单管理',
        component: () => import('@/views/acl/menu/list'),
        meta: { title: '菜单管理' }
      },
      {
        path: 'user/add',
        name: '用户添加',
        component: () => import('@/views/acl/user/form'),
        meta: { title: '用户添加' },
        hidden: true
      },
      {
        path: 'user/update/:id',
        name: '用户修改',
        component: () => import('@/views/acl/user/form'),
        meta: { title: '用户修改' },
        hidden: true
      },
      {
        path: 'user/role/:id',
        name: '用户角色',
        component: () => import('@/views/acl/user/userForm'),
        meta: { title: '用户角色' },
        hidden: true
      }
    ]
  },
  {
    path: '/answer_question',
    component: Layout,
    children: [
      {
        path: 'question',
        name: 'Question',
        component: () => import('@/views/answer_question/question/List'),
        meta: { title: '问题管理',  icon:'answer_question'}
      },
      {
        path: 'answer',
        name: 'Answer',
        component: () => import('@/views/answer_question/answer/List'),
        meta: { title: '答复管理' , icon:'answer_answer'  }
      }
    ],
    meta: { title: '答疑管理', icon:'answer_service' }
  },
  {
    path: '/article',
    component: Layout,
    children: [
      {
        path: 'article',
        name: 'Article',
        component: () => import('@/views/article/article/List'),
        meta: { title: '文章管理',  icon:'article'}
      },
      {
        path: 'type',
        name: 'Type',
        component: () => import('@/views/article/type/List'),
        meta: { title: '类型管理' , icon:'article_type'  }
      },
      {
        path: 'comment',
        name: 'Comment',
        component: () => import('@/views/article/comment/List'),
        meta: { title: '评论管理' , icon:'article_comment'  }
      }
    ],
    meta: { title: '文章管理', icon:'article' }
  },
  {
    path: '/class',
    component: Layout,
    children: [
      {
        path: 'class',
        name: 'Class',
        component: () => import('@/views/class/class/List'),
        meta: { title: '班级管理',  icon:'article'}
      },
      {
        path: 'group',
        name: 'Group',
        component: () => import('@/views/class/group/List'),
        meta: { title: '小组管理',  icon:'article'}
      }
    ],
    meta: { title: '班级管理', icon:'article' }
  },
  {
    path: '/users',
    component: Layout,
    children: [
      {
        path: 'user',
        name: '用户管理',
        component: () => import('@/views/users/userList'),
        meta: { title: '用户管理', icon: 'form' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
