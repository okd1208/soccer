<template>
  <div>
    <div class="PlayerCellParent">
      <div class="PlayerCellChild"><img :src="PlayerInfo.fotoURL"></div>
      <div class="PlayerCellChild profile" v-b-toggle=PlayerName>
        <h5>{{ PlayerInfo.name }}</h5>
        <p class="PlayerProfile">{{ PlayerInfo.profile }}</p>
        <!-- <b-button class="moreBtn" v-b-toggle=PlayerName>詳細をみる</b-button> -->
      </div>
      <div class="PlayerCellChild"><chart height="160px" :chartdata="chartData" :options="chartOptions" /></div>
    </div>
    <b-collapse :id="PlayerName">
      <b-card>
        <detail-player-cell/>
      </b-card>
    </b-collapse>
  </div>
</template>

<script>
import Chart from './RaderChart.vue'
import DetailPlayerCell from './DetailPlayerCell.vue'
export default {
  name: 'App',
  props: {
    'PlayerInfo': {
      type: Array,
      default: ''
    }
  },
  data: function () {
    return {
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
  }
}
</script>

<style>
.PlayerCellParent {
  display: flex;
}

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

.PlayerCellChild > img {
  width: 160px;
  height: 160px;
}

.PlayerProfile {
  font-size: 12px;
}

.moreBtn {
  float: right;
  margin: 0 16px 16px 0;
}
</style>
