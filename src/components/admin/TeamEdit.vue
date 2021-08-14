<template>
  <div>
    <div class="TeamEditField">
      <team-cell v-for="Team in Teams" :key="Team.name" :TeamInfo="Team" class="TeamCell"></team-cell>
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
.TeamEditField {
  margin-top: 62px;
  background-color: rgb(228, 250, 228);
  padding: 32px 0px;
  margin-right: 160px;
}
.MenberContainer div {
  width: 160px;
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
