<template>
  <div class="PlayerCellParent">
    <div class="PlayerCellChild"><img :src="PlayerInfo.fotoURL"></div>
    <div class="PlayerCellChild profile">2</div>
    <div class="PlayerCellChild"><chart height="160px" :chartdata="chartData" :options="chartOptions" /></div>
  </div>
</template>

<script>
import Chart from './RaderChart.vue'
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
      test: 'dfsafasd',
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
    Chart
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
}

.PlayerCellChild > img {
  width: 160px;
  height: 160px;
}
</style>
