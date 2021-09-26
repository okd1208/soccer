<template>
  <div class="DetailPlayerlPage" v-if="isGetData">
    <div class="parent main">
      <div class="DetailPlayerlInfo">
        <h4>{{ DetailPlayerInfo.name }}</h4>
        <p>出身: {{ DetailPlayerInfo.from }}</p>
        <p>生年月日: {{ getBirthday(DetailPlayerInfo.birthday) }}</p>
        <p>{{ DetailPlayerInfo.profile }}</p>
      </div>
      <div class="DetailPlayerlImg">
        <img :src="DetailPlayerInfo.fotoURL" width="100%">
      </div>
    </div>
    <chart :height="400" :chartdata="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import Mixin from '../../mixins/DB'
import Chart from '../RaderChart.vue'
export default {
  mixins: [Mixin],
  data: function () {
    return {
      isGetData: false,
      chartData: {
        labels: ['ディフェンス', '体力', 'アシスト', 'シュート', 'ドリブル'],
        datasets: [
          {
            label: '能力値',
            data: [65, 70, 40, 68, 80],
            backgroundColor: 'rgb(171, 209, 240, 0.6)'
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
    Chart
  },
  methods: {
    getBirthday (birthday) {
      var d = birthday.split('-')
      return d[0] + '年' + d[1] + '月' + d[2] + '日'
    }
  },
  created () {
  },
  watch: {
    DetailPlayerInfo: function (newVal, oldVal) {
      console.log(newVal, oldVal)
      newVal.AbilityScore.pop()
      this.chartData.datasets.data = newVal.AbilityScore
      console.log(this.chartData.datasets.data)
      this.isGetData = true
    }
  }
}
</script>

<style scoped>
.main {
  padding: 32px 0;
  background-color: rgb(0, 0, 0);
  color: white;
}
.DetailPlayerlPage {
  /* margin: 32px 0; */
}
.DetailPlayerlImg {
  margin-right: 20%;
  width: 50%;
}
.DetailPlayerlInfo {
  margin-left: 20%;
  width: 50%;
}
</style>
