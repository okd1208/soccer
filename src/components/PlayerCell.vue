<template>
  <transition name="fade">
    <div v-if="!isLookon || targetItem">
      <router-link class="routerLink" :to="`Player/${ItemId}`">
      <div class="parent">
        <div class="PlayerCellChild">
          <img class="TeamIcon" :id="PlayerInfo.name">
          <img class="PlayerImg" :src="PlayerInfo.fotoURL">
        </div>
        <div class="PlayerCellChild profile">
          <div>
            <h5><span class="underbar">{{ PlayerInfo.name }} ( {{ getage(PlayerInfo.birthday) }}歳 )</span></h5>
            <p class="PlayerProfile">{{ PlayerInfo.profile }}</p>
          </div>
          <p><span class="underbar">{{ PlayerInfo.position }}</span></p>
        </div>
        <div class="PlayerCellChild chart"><chart :height="160" :chartdata="chartData" :options="chartOptions" /></div>
      </div>
      </router-link>
      <b-collapse class="b-collapse" :id="toggleId">
        <b-card>
          <detail-player-cell :PlayerInfo="PlayerInfo" :labels="chartData.labels"/>
        </b-card>
      </b-collapse>
      <div v-b-toggle=toggleId @click="chageBarText" class="toggleBar">{{ bar }}</div>
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
      bar: 'スコアを表示',
      BTstoragePath: '',
      toggleId: null,
      path: '/Player/' + this.ItemId,
      chartData: {
        labels: ['ディフェンス', '体力', 'アシスト', 'シュート', 'ドリブル'],
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
        maintainAspectRatio: false,
        scale: {
          ticks: {
            suggestedMax: 100,
            suggestedMin: 0
          }
        }
      }
    }
  },
  components: {
    Chart,
    DetailPlayerCell
  },
  methods: {
    chageBarText () {
      if (this.bar === 'スコアを表示') {
        this.bar = '閉じる'
      } else {
        this.bar = 'スコアを表示'
      }
    },
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
    let addCount = this.PlayerInfo.AbilityScore.pop()
    this.$set(this.PlayerInfo, 'addCount', addCount)
    this.$set(this.PlayerInfo, 'key', this.ItemId)
    if (!this.PlayerInfo.fotoURL) {
      this.PlayerInfo.fotoURL = require('../assets/default_icon_player.png')
    }
    if (this.PlayerInfo.preview) {
      return
    }
    this.TeamsRef.where('Member', 'array-contains', this.PlayerInfo.name).get().then(snapShot => {
      snapShot.forEach(doc => {
        this.BelongTeam = doc.data().TeamName
        this.BTstoragePath = doc.data().storagePath
        this.$set(this.PlayerInfo, 'BelongTeam', this.BelongTeam)
        this.changeIcon(this.BTstoragePath, this.PlayerInfo.name)
      })
    })
    if (this.PlayerInfo.name) {
      this.toggleId = this.PlayerInfo.name.replace(/\s+/g, '')
    }
    if (this.PlayerInfo.position === 'FW(フォワード)') {
      this.chartData.labels = ['オフェンス', 'ドリブル', '体力', 'シュート', 'アシスト']
    } else if (this.PlayerInfo.position === 'MF(ボランチ)') {
      this.chartData.labels = ['ディフェンス', 'フィジカル', '体力', 'パス', 'ドリブル']
    } else if (this.PlayerInfo.position === 'MF(サイドハーフ)') {
      this.chartData.labels = ['シュート', 'フィジカル', 'ドリブル', 'パス', 'アシスト']
    } else if (this.PlayerInfo.position === 'MF(トップ下)') {
      this.chartData.labels = ['テクニック', 'フィジカル', 'ドリブル', 'パス', 'メンタル']
    } else if (this.PlayerInfo.position === 'DF(センターバック)') {
      this.chartData.labels = ['戦術', 'フィジカル', 'ドリブル', 'パス', 'キック']
    }
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
  background-color: rgb(245, 245, 245);
  text-align: left;
  padding: 16px 0 0 32px;
}

.PlayerImg {
  width: 160px;
  height: 160px;
  background-color: rgb(236, 236, 236);
  object-fit: cover;
}

.PlayerProfile {
  font-size: 12px;
}

.chart {
  width: 20%;
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

.b-collapse > div > div{
  padding: 0px;
}

.profile > div{
  height: 114px;
  overflow: hidden;
}

.toggleBar {
  width: 100%;
  background-color: rgba(196, 196, 196, 0.384);
  color: rgb(0, 0, 0);
  /* border: 1px solid rgba(0, 0, 0, 0.315); */
  border-top: none;
  transition: 0.5s;
}
.toggleBar:hover{
  background-color: rgb(243, 243, 243);
  transition: 0.5s;
}

.routerLink {
  color: #2c3e50;
}
.routerLink:hover {
  text-decoration: none;
}
</style>
