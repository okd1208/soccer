import Vue from 'vue'
import Router from 'vue-router'
import TopPage from '@/components/mainPage/TopPage'
import RankingPage from '@/components/mainPage/RankingPage'
import PlayerEdit from '@/components/admin/PlayerEdit'
import TeamEdit from '@/components/admin/TeamEdit'
import login from '@/components/admin/login'
import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'TopPage',
      component: TopPage
    },
    {
      path: '/RankingPage',
      name: 'RankingPage',
      component: RankingPage
    },
    {
      path: '/admin',
      name: 'PlayerEdit',
      component: PlayerEdit,
      meta: { requiresAuth: true }
    },
    {
      path: '/admin/TeamEdit',
      name: 'TeamEdit',
      component: TeamEdit,
      meta: { requiresAuth: true }
    },
    {
      path: '/admin-signin',
      name: 'login',
      component: login
    }
  ]
})

router.beforeEach((to, from, next) => {
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  let currentUser = firebase.auth().currentUser
  if (requiresAuth) {
    if (!currentUser) {
      next({
        path: '/admin-signin',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
