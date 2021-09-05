<template>
  <div class="adminMaincont">
    <div class="parent-wrap">
      <team-cell @lookonToggle="lookonToggle" v-for="(Team,key) in Teams" :key="key" :isLookon="isLookon" :ItemId="key" :TeamInfo="Team" class="TeamCell"></team-cell>
    </div>
    <div class="EditField">
      <h3 v-if="!isLookon">新規チーム追加</h3>
      <h3 v-if="isLookon">編集</h3>
      <div><label class="NewTeamLabel">名前</label><input v-model="TeamName" type="text"></div>
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
      <button class="simpleBtn" v-if="!isLookon" @click="addTeamsRef(PreviewCell)">新規登録</button>
      <button class="simpleBtn" v-if="isLookon" @click="UpdateTeamsRef(PreviewCell)">保存</button>
      <button class="DeleteButton" v-if="isLookon" @click="deleteItem(PreviewCell.key, 'Teams')">削除</button>
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
      isLookon: false
    }
  },
  methods: {
    lookonToggle (Team, key) {
      if (!this.isLookon) {
        this.PreviewCell.key = key
        this.TeamName = Team.TeamName
        this.TeamMenber = Team.Menber
        document.getElementById('image').src = Team.fotoURL
        this.UpdatePreviewCell()
      } else {
        this.clearFeald()
      }
      this.isLookon = !this.isLookon
    }
  },
  deleteItem (a, d) {
    console.log('test')
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
