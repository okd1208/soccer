// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/database'
import 'firebase/firestore'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(BootstrapVue)

Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: 'AIzaSyCp3Ojc05UC0Qt-ADmiSrbqyz1-38EWSvY',
  authDomain: 'soccer-683dc.firebaseapp.com',
  projectId: 'soccer-683dc',
  storageBucket: 'soccer-683dc.appspot.com',
  messagingSenderId: '212054882871',
  appId: '1:212054882871:web:ea59b4a7dca0f84230ddb2'
}

firebase.initializeApp(firebaseConfig)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
