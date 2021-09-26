import Vue from 'vue'
import Router from 'vue-router'
import TopPage from '@/components/mainPage/TopPage'
import RankingPage from '@/components/mainPage/RankingPage'
import DetailPlayer from '@/components/mainPage/DetailPlayer'
import AdminPage from '@/components/admin/adminPage'
import AdminTop from '@/components/admin/top'
import PlayerEdit from '@/components/admin/PlayerEdit'
import TeamEdit from '@/components/admin/TeamEdit'
import event from '@/components/admin/event'
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
      path: '/Player/:id',
      name: 'DetailPlayer',
      component: DetailPlayer
    },
    {
      path: '/RankingPage',
      name: 'RankingPage',
      component: RankingPage
    },
    {
      path: '/admin',
      name: 'AdminPage',
      component: AdminPage,
      // meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'AdminTop',
          component: AdminTop
        },
        {
          path: 'PlayerEdit',
          name: 'PlayerEdit',
          component: PlayerEdit
        },
        {
          path: 'TeamEdit',
          name: 'TeamEdit',
          component: TeamEdit
        },
        {
          path: 'event',
          name: 'event',
          component: event
        }
      ]
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
