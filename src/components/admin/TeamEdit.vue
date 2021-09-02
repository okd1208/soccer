<template>
  <div class="adminMaincont">
    <div class="parent">
      <team-cell v-for="Team in Teams" :key="Team.name" :TeamInfo="Team" class="TeamCell"></team-cell>
    </div>
    <div class="EditField">
      <h3>チーム名</h3>
      <div><label class="NewPlayerLabel">名前</label><input v-model="TeamName" type="text"></div>
      <div class="MenberContainer">
        <h5>選手を選択</h5>
        <div v-for="Player in Players" :key="Player.name">
          <input type="checkbox" :value="Player.name" v-model="TeamMenber">
          <label :for="Player.name">{{ Player.name }}</label>
        </div>
      </div>
      <p></p>
      <span><img id="image" width='100px' @change="UpdatePreviewCell()" src=""></span>
      <input @change="fotoUp('TeamInput')" id="TeamInput" type="file" value="upload">
      <button @click="addTeamsRef()">addTeamsRef</button>
    </div>
  </div>
</template>

<script>
import Mixin from '../../mixin'
import TeamCell from '../TeamCell.vue'
export default {
  mixins: [Mixin],
  components: {
    TeamCell
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.MenberContainer div {
  display: inline-block;
  margin: 12px 32px;
}
.MenberContainer {
  padding-top: 16px;
  margin: 0 auto;
  width: 80%;
  background-color: rgba(238, 232, 232, 0.705);
}
</style>
