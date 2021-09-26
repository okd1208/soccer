<template>
  <div class="parent">
    <div class="parent-wrap scoreTables">
      <div class="child">
        <p>ゴール数: {{ TotalScore(PlayerInfo.LeagueGC,PlayerInfo.CupGC,PlayerInfo.ClGC) }}</p>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">リーグ</th>
              <th scope="col">カップ</th>
              <th scope="col">CL・EL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ PlayerInfo.LeagueGC }}</td>
              <td>{{ PlayerInfo.CupGC }}</td>
              <td>{{ PlayerInfo.ClGC }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="child">
        <p>アシスト数: {{ TotalScore(PlayerInfo.LeagueAC,PlayerInfo.CupAC,PlayerInfo.ClAC) }}</p>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">リーグ</th>
              <th scope="col">カップ</th>
              <th scope="col">CL・EL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ PlayerInfo.LeagueAC }}</td>
              <td>{{ PlayerInfo.CupAC }}</td>
              <td>{{ PlayerInfo.ClAC }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="evaluationForm">
      <p>評価送信 <input type="submit" value="送信" @click="addAbilityScores()"></p>
      <div class="cp_iptxt" v-for="n in 5" :key="n">
        <input min="0" max="100" class="ef" v-model="AbilityScores[n-1]" type="number">
        <label>{{ labels[n - 1] }}</label>
        <span class="focus_line"></span>
      </div>
    </div>
  </div>
</template>

<script>
import Mixin from '../mixins/DB'
export default ({
  mixins: [Mixin],
  props: {
    'PlayerInfo': {
      type: Object,
      default: ''
    },
    labels: Array
  },
  data: function () {
    return {
    }
  },
  methods: {
    async addAbilityScores () {
      const numAddCount = this.PlayerInfo.addCount + 1
      var arr = []
      for (let i = 0; i < 5; i++) {
        if (this.AbilityScores[i] !== undefined) {
          var score = parseInt(this.AbilityScores[i], 10)
          var sum = this.PlayerInfo.AbilityScore[i] * this.PlayerInfo.addCount + score
          arr[i] = parseInt(sum / numAddCount, 10)
        } else {
          arr[i] = this.PlayerInfo.AbilityScore[i]
        }
      }
      arr[5] = numAddCount
      await this.PlayersRef.doc(this.PlayerInfo.key).update({
        AbilityScore: arr
      })
      this.$router.go({path: this.$router.currentRoute.path, force: false})
    }
  }
})
</script>

<style scoped>
.child {
  margin: 16px;
}
.scoreTables {
  width: 80%;
}
.evaluationForm{
  /* margin: -1.25rem; */
  width: 20%;
  background-color: rgba(250, 235, 215, 0.712);
  padding-bottom: 10px;
}
.evaluationForm p input {
  font-size: 12px;
  float: right;
  /* margin-left: 10px; */
}
.evaluationForm p {
  margin-bottom: 0;
}
.cp_iptxt > label {
  font-size: 10px;
  text-align: left;
}
.cp_iptxt {
  margin: 0 auto;
}
.ef:focus ~ label, .cp_iptxt.ef ~ label {
  top: 0;
}
</style>
