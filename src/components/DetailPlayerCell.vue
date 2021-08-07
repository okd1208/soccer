<template>
  <div class="parent">
    <div class="child">
      <p>ゴール数: {{ TotalScore(PlayerInfo.goal) }}</p>
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
            <td>{{ PickupScore(PlayerInfo.goal, 0) }}</td>
            <td>{{ PickupScore(PlayerInfo.goal, 1) }}</td>
            <td>{{ PickupScore(PlayerInfo.goal, 2) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="child">
      <p>アシスト数: {{ TotalScore(PlayerInfo.assist) }}</p>
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
            <td>{{ PickupScore(PlayerInfo.assist, 0) }}</td>
            <td>{{ PickupScore(PlayerInfo.assist, 1) }}</td>
            <td>{{ PickupScore(PlayerInfo.assist, 2) }}</td>
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
