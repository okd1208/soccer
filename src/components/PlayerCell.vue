<template>
  <transition name="fade">
    <div v-if="!isLookon || targetItem">
      <div class="parent">
        <div class="PlayerCellChild">
          <img class="TeamIcon" :id="PlayerInfo.name">
          <img class="PlayerImg" :src="PlayerInfo.fotoURL">
        </div>
        <div class="PlayerCellChild profile" v-b-toggle=PlayerName>
          <h5>{{ PlayerInfo.name }} ( {{ getage(PlayerInfo.birthday) }}歳 )</h5>
          <p class="PlayerProfile">{{ PlayerInfo.profile }}</p>
        </div>
        <div class="PlayerCellChild"><chart :height="160" :chartdata="chartData" :options="chartOptions" /></div>
      </div>
      <b-collapse :id="PlayerName">
        <b-card>
          <detail-player-cell :PlayerInfo="PlayerInfo"/>
        </b-card>
      </b-collapse>
      <div v-if="IsEdit">
        <button @click="setTargetToggle(), $emit('lookonToggle', PlayerInfo, ItemId)" class="EditButton"><span v-if="!targetItem">編集</span><span v-if="targetItem">編集をやめる</span></button>
        <button @click="deleteItem(ItemId, 'Players')" class="DeleteButton">削除</button>
      </div>
    </div>
  </transition>
</template>

<script>
import Mixin from '../mixins/DB'
import Chart from './RaderChart.vue'
import DetailPlayerCell from './DetailPlayerCell.vue'
export default {
  props: {
    'PlayerInfo': {
      type: Object,
      default: ''
    },
    IsEdit: Boolean,
    ItemId: String,
    isLookon: Boolean
  },
  mixins: [Mixin],
  data: function () {
    return {
      BelongTeam: '',
      BTstoragePath: '',
      PlayerName: this.PlayerInfo.name,
      chartData: {
        labels: ['ディフェンス', 'ドリブル', 'アシスト', 'シュート', '体力'],
        datasets: [
          {
            label: '能力値',
            data: this.PlayerInfo.AbilityScore,
            backgroundColor: 'rgb(171, 209, 240)'
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  components: {
    Chart,
    DetailPlayerCell
  },
  methods: {
    getage (birthday) {
      if (!birthday) {
        return 0
      }
      var today = new Date()
      var NowYear = today.getFullYear()
      var NowMonth = today.getMonth() + 1
      var NowDay = today.getDate()
      var datearray = birthday.split('-')
      var Byear = Number.parseInt(datearray[0], 10)
      var Bmonth = Number.parseInt(datearray[1], 10)
      var Bday = Number.parseInt(datearray[2], 10)
      var age = NowYear - Byear - 1
      if (NowMonth >= Bmonth) {
        if (NowMonth === Bmonth && NowDay < Bday) {
          return age
        }
        age += 1
      }
      return age
    },
    setTargetToggle () {
      this.targetItem = !this.targetItem
    }
  },
  created () {
    if (!this.PlayerInfo.fotoURL) {
      this.PlayerInfo.fotoURL = require('../assets/default_icon_player.png')
    }
    if (this.PlayerInfo.preview) {
      return
    }
    this.TeamsRef.where('Menber', 'array-contains', this.PlayerInfo.name).get().then(snapShot => {
      snapShot.forEach(doc => {
        this.BelongTeam = doc.data().TeamName
        this.BTstoragePath = doc.data().storagePath
        this.$set(this.PlayerInfo, 'BelongTeam', this.BelongTeam)
        this.changeIcon(this.BTstoragePath, this.PlayerInfo.name)
      })
    })
  }
}
</script>

<style scoped>
.PlayerCellChild {
  width: 160px;
  /* background-color: rgb(172, 189, 172); */
  height: 160px;
}

.profile{
  flex-grow: 1;
  background-color: rgb(233, 240, 233);
  text-align: left;
  padding: 16px 0 0 32px;
}

.PlayerImg {
  width: 160px;
  height: 160px;
  background-color: rgb(236, 236, 236);
}

.PlayerProfile {
  font-size: 12px;
}

.moreBtn {
  float: right;
  margin: 0 16px 16px 0;
}

.TeamIcon {
  height: 40px;
  position: absolute;
  margin-top: 120px;
  margin-left: 120px;
  z-index: 1;
}
</style>
