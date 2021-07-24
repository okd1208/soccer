import Vue from 'vue'
import Router from 'vue-router'
import TopPage from '@/components/TopPage'
import RankingPage from '@/components/RankingPage'

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
    }
  ]
})
