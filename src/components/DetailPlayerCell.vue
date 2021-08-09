<template>
  <div class="parent">
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
</template>

<script>
import Mixin from '../mixin'
export default ({
  mixins: [Mixin],
  props: {
    'PlayerInfo': {
      type: Object,
      default: ''
    }
  }
})
</script>

<style scoped>
.parent {
  display: flex;
}

.child {
  margin: 16px;
}
</style>
