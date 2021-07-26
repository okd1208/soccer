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
      {name: 'ブライム・アムダニ', fotoURL: require('../assets/Player1.jpeg'), AbilityScore: [60, 80, 20, 60, 90], profile: 'フランスのASカンヌでキャリアをスタートさせた。2シーズン在籍した後、同じく1部のRCストラスブールへと移籍した。そこでの活躍が認められ、国内の強豪であるオリンピック・マルセイユへと移籍。'},
      {name: 'ナシム・アクルール', fotoURL: require('../assets/Player2.jpeg'), AbilityScore: [60, 30, 60, 50, 90], profile: 'フランスのASカンヌでキャリアをスタートさせた。2シーズン在籍した後、同じく1部のRCストラスブールへと移籍した。そこでの活躍が認められ、国内の強豪であるオリンピック・マルセイユへと移籍。'},
      {name: 'イスラム・スリマニ', fotoURL: require('../assets/Player3.jpeg'), AbilityScore: [10, 10, 20, 50, 90], profile: 'フランスのASカンヌでキャリアをスタートさせた。2シーズン在籍した後、同じく1部のRCストラスブールへと移籍した。そこでの活躍が認められ、国内の強豪であるオリンピック・マルセイユへと移籍。'},
      {name: 'ホッサム・ガリ', fotoURL: require('../assets/Player1.jpeg'), AbilityScore: [10, 40, 20, 50, 90], profile: 'フランスのASカンヌでキャリアをスタートさせた。2シーズン在籍した後、同じく1部のRCストラスブールへと移籍した。そこでの活躍が認められ、国内の強豪であるオリンピック・マルセイユへと移籍。'},
      {name: 'モハメド・サラー', fotoURL: require('../assets/Player2.jpeg'), AbilityScore: [70, 10, 20, 50, 90], profile: 'フランスのASカンヌでキャリアをスタートさせた。2シーズン在籍した後、同じく1部のRCストラスブールへと移籍した。そこでの活躍が認められ、国内の強豪であるオリンピック・マルセイユへと移籍。'},
      {name: 'エルサムニー・オサマ', fotoURL: require('../assets/Player3.jpeg'), AbilityScore: [90, 10, 20, 50, 90], profile: 'フランスのASカンヌでキャリアをスタートさせた。2シーズン在籍した後、同じく1部のRCストラスブールへと移籍した。そこでの活躍が認められ、国内の強豪であるオリンピック・マルセイユへと移籍。'},
      {name: 'モハメド・アブトレイカ', fotoURL: require('../assets/Player1.jpeg'), AbilityScore: [10, 10, 20, 50, 90], profile: 'フランスのASカンヌでキャリアをスタートさせた。2シーズン在籍した後、同じく1部のRCストラスブールへと移籍した。そこでの活躍が認められ、国内の強豪であるオリンピック・マルセイユへと移籍。'},
      {name: 'モハメド・セディク', fotoURL: require('../assets/Player2.jpeg'), AbilityScore: [100, 50, 20, 50, 90], profile: 'フランスのASカンヌでキャリアをスタートさせた。2シーズン在籍した後、同じく1部のRCストラスブールへと移籍した。そこでの活躍が認められ、国内の強豪であるオリンピック・マルセイユへと移籍。'}
    ]
  }
})
