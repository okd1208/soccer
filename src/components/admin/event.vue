<template>
  <div>
    <div class="parent-wrap">
      <logo-cell @lookonToggle="lookonToggle" v-for="(Event,key) in Event" :key="key" :isLookon="isLookon" :ItemId="key" :TeamInfo="Event"></logo-cell>
    </div>
    <div class="EditField">
      <h3 v-if="!isLookon">新規チーム追加</h3>
      <h3 v-if="isLookon">編集</h3>
      <div><label>名前</label><input v-model="EventName" type="text"></div>
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
      <span><img id="image" width='100px' @change="UpdatePreviewCell()" src=""></span>
      <input @change="fotoUp('EventInput')" id="EventInput" type="file" value="upload">
      <button class="simpleBtn" v-if="!isLookon" @click="addEventRef()">新規登録</button>
      <button class="simpleBtn" v-if="isLookon" @click="UpdateEventRef(PreviewCell)">保存</button>
      <button class="DeleteButton" v-if="isLookon" @click="deleteItem(PreviewCell.key, 'Event')">削除</button>
    </div>
  </div>
</template>

<script>
import Mixin from '../../mixins/DB'
import LogoCell from '../TeamCell.vue'
export default {
  mixins: [Mixin],
  components: {
    LogoCell
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
