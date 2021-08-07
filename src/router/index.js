import Vue from 'vue'
import Router from 'vue-router'
import TopPage from '@/components/mainPage/TopPage'
import RankingPage from '@/components/mainPage/RankingPage'
import PlayerEdit from '@/components/admin/PlayerEdit'

Vue.use(Router)

export default new Router({
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
      component: PlayerEdit
    }
  ]
})
