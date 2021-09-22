<template>
  <div>
    <div class="parent-wrap">
      <team-cell @lookonToggle="lookonToggle" v-for="(Team,key) in Teams" :key="key" :isLookon="isLookon" :ItemId="key" :TeamInfo="Team"></team-cell>
    </div>
    <div class="EditField">
      <h3 v-if="!isLookon">新規チーム追加</h3>
      <h3 v-if="isLookon">編集</h3>
      <div class="cp_iptxt">
        <input class="ef" type="text" @change="UpdatePreviewCell()" v-model="TeamName">
        <label>チーム名</label>
        <span class="focus_line"></span>
      </div>
      <div class="MenberContainer">
        <h5>選手を選択</h5>
        <div v-for="Player in Players" :key="Player.name">
          <input type="checkbox" :value="Player.name" v-model="TeamMenber">
          <label :for="Player.name">{{ Player.name }}</label>
        </div>
      </div>
      <h5 v-if="myEvents">参加イベント一覧</h5>
      <div v-if="myEvents" class="parent-wrap">
        <div class="myEvent" v-for="event in myEvents" :key="event.name">
          <img :src="event.fotoURL" width="100%">
          {{ event.name }}
        </div>
      </div>
      <p></p>
      <span><img id="image" width='100px' @change="UpdatePreviewCell()" src=""></span>
      <input @change="fotoUp()" v-bind:disabled="!isEditable" id="TeamsInput" type="file" value="upload">
      <loading-icon v-show="loading"></loading-icon>
      <button class="simpleBtn" v-bind:disabled="!isEditable" v-if="!isLookon" @click="addTeamsRef(PreviewCell)">新規登録</button>
      <button class="simpleBtn" v-if="isLookon" @click="UpdateTeamsRef(PreviewCell)">保存</button>
      <button class="DeleteButton" v-if="isLookon" @click="deleteItem(PreviewCell.key, 'Team')">削除</button>
      <p v-if="errorMessage">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import Mixin from '../../mixins/DB'
import TeamCell from '../TeamCell.vue'
import LoadingIcon from '../Loading.vue'
export default {
  mixins: [Mixin],
  components: {
    TeamCell,
    LoadingIcon
  },
  data () {
    return {
      isLookon: false,
      myEvents: null
    }
  },
  methods: {
    lookonToggle (Team, key) {
      if (!this.isLookon) {
        this.PreviewCell.key = key
        this.TeamName = Team.TeamName
        this.TeamMenber = Team.Menber
        this.nowName = Team.TeamName
        this.storagePath = Team.storagePath
        this.myEvents = Team.myEvents
        document.getElementById('image').src = Team.fotoURL
        this.UpdatePreviewCell()
      } else {
        this.clearFeald()
        this.myEvents = null
      }
      this.isLookon = !this.isLookon
    }
  }
}
</script>

<style scoped>
.myEvent {
  width: 100px;
  margin: 32px;
}
</style>
