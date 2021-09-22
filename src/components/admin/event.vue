<template>
  <div>
    <div class="parent-wrap">
      <logo-cell @lookonToggle="lookonToggle" v-for="(Event,key) in Event" :key="key" :isLookon="isLookon" :ItemId="key" :TeamInfo="Event"></logo-cell>
    </div>
    <div class="EditField">
      <h3 v-if="!isLookon">新規イベント追加</h3>
      <h3 v-if="isLookon">編集</h3>
      <div class="cp_iptxt">
        <input class="ef" type="text" @change="UpdatePreviewCell()" v-model="EventName">
        <label>イベント名</label>
        <span class="focus_line"></span>
      </div>
        <label><input type="radio" v-model="EventType" value="league">リーグ</label>
        <label><input type="radio" v-model="EventType" value="cup">カップ</label>
        <label><input type="radio" v-model="EventType" value="clel">CL.EL</label>
      <div class="MenberContainer">
        <h5>参加チーム</h5>
        <div v-for="Team in Teams" :key="Team.TeamName">
          <input type="checkbox" :value="Team.TeamName" v-model="ParticipatingTeam">
          <label :for="Team.TeamName">{{ Team.TeamName }}</label>
        </div>
      </div>
      <p></p>
      <span @change="UpdatePreviewCell()"><img id="image" width='100px' src=""></span>
      <input @change="fotoUp()" v-bind:disabled="!isEditable" id="EventInput" type="file" value="upload">
      <loading-icon v-show="loading"></loading-icon>
      <button v-bind:disabled="!isEditable" class="simpleBtn" v-if="!isLookon" @click="addEventRef()">新規登録</button>
      <button class="simpleBtn" v-if="isLookon" @click="UpdateEventRef(PreviewCell)">保存</button>
      <button class="DeleteButton" v-if="isLookon" @click="deleteItem(PreviewCell.key, 'Event')">削除</button>
      <p v-if="errorMessage">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import Mixin from '../../mixins/DB'
import LogoCell from '../TeamCell.vue'
import LoadingIcon from '../Loading.vue'
export default {
  mixins: [Mixin],
  components: {
    LogoCell,
    LoadingIcon
  },
  data () {
    return {
      isLookon: false
    }
  },
  methods: {
    lookonToggle (Event, key) {
      if (!this.isLookon) {
        this.PreviewCell.key = key
        this.EventName = Event.EventName
        this.EventType = Event.EventType
        this.nowName = Event.EventName
        this.storagePath = Event.storagePath
        this.ParticipatingTeam = Event.ParticipatingTeam
        document.getElementById('image').src = Event.fotoURL
        this.UpdatePreviewCell()
      } else {
        this.clearFeald()
      }
      this.isLookon = !this.isLookon
    }
  }
}
</script>

<style scoped>
</style>
