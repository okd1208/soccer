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
    Players: [
      {name: 'honda', fotoURL: require('../assets/honda-keisuke.jpeg'), AbilityScore: [60, 80, 20, 50, 90]},
      {name: 'test', fotoURL: require('../assets/test.jpg'), AbilityScore: [60, 30, 60, 50, 90]},
      {name: 'honda1', fotoURL: require('../assets/honda-keisuke.jpeg'), AbilityScore: [10, 10, 20, 50, 90]},
      {name: 'test1', fotoURL: require('../assets/test.jpg'), AbilityScore: [10, 40, 20, 50, 90]},
      {name: 'honda2', fotoURL: require('../assets/honda-keisuke.jpeg'), AbilityScore: [70, 10, 20, 50, 90]},
      {name: 'test2', fotoURL: require('../assets/test.jpg'), AbilityScore: [90, 10, 20, 50, 90]},
      {name: 'honda3', fotoURL: require('../assets/honda-keisuke.jpeg'), AbilityScore: [10, 10, 20, 50, 90]},
      {name: 'test3', fotoURL: require('../assets/test.jpg'), AbilityScore: [100, 50, 20, 50, 90]}
    ]
  }
})
