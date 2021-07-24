import Vue from 'vue'
import Vuex from 'vuex'
// import * as actions from 'js/store/actions'
// import * as getters from 'js/store/getters'
// import { mutations } from 'js/store/mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  // actions,
  // getters,
  // mutations,
  state: {
    images: [
      {name: 'honda', fotoURL: require('../assets/honda-keisuke.jpeg')},
      {name: 'test', fotoURL: require('../assets/test.jpg')},
      {name: 'honda1', fotoURL: require('../assets/honda-keisuke.jpeg')},
      {name: 'test1', fotoURL: require('../assets/test.jpg')},
      {name: 'honda2', fotoURL: require('../assets/honda-keisuke.jpeg')},
      {name: 'test2', fotoURL: require('../assets/test.jpg')},
      {name: 'honda3', fotoURL: require('../assets/honda-keisuke.jpeg')},
      {name: 'test3', fotoURL: require('../assets/test.jpg')}
    ]
  }
})
