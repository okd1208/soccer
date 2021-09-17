<template>
  <div>
    <player-cell @lookonToggle="lookonToggle" v-for="(Player,key) in Players" :key="key" :isLookon="isLookon" :ItemId="key" :PlayerInfo="Player" :IsEdit=true class="PlayerCell"></player-cell>
    <div class="EditField">
      <h3 v-if="!isLookon">新規登録</h3>
      <h3 v-if="isLookon">編集</h3>
      <div><label>名前</label><input @change="UpdatePreviewCell()" v-model="PlayerName" type="text"></div>
      <div><label>プロフィール</label><input @change="UpdatePreviewCell()" v-model="profile" type="text"></div>
      <div><label>生年月日</label><input @change="UpdatePreviewCell()" v-model="birthday" type="date"></div>
      <div><label>リーグGC</label><input @change="UpdatePreviewCell()" v-model="LeagueGC" type="number"></div>
      <div><label>カップGC</label><input @change="UpdatePreviewCell()" v-model="CupGC" type="number"></div>
      <div><label>CL.ELGC</label><input @change="UpdatePreviewCell()" v-model="ClGC" type="number"></div>
      <div><label>リーグAC</label><input @change="UpdatePreviewCell()" v-model="LeagueAC" type="number"></div>
      <div><label>カップAC</label><input @change="UpdatePreviewCell()" v-model="CupAC" type="number"></div>
      <div><label>CL.ELAC</label><input @change="UpdatePreviewCell()" v-model="ClAC" type="number"></div>
      <div><label>Uniform</label><input @change="UpdatePreviewCell()" v-model="uniform" type="number"></div>
      <div><label>出身</label><input @change="UpdatePreviewCell()" v-model="from" type="text"></div>
      <div><label>身長</label><input @change="UpdatePreviewCell()" v-model="height" type="number"></div>
      <div><label>ポジション</label>
        <select v-model="position" @change="UpdatePreviewCell()">
          <option disabled value="">ポジション</option>
          <option>FW(フォワード)</option>
          <option>MF(サイドハーフ)</option>
          <option>MF(トップ下)</option>
          <option>MF(ボランチ)</option>
          <option>DF(サイドバック)</option>
          <option>DF(センターバック)</option>
          <option>GK（ゴールキーパー）</option>
        </select>
      </div>
      <div><label>所属チーム</label>
        <select v-model="BelongTeam" @change="UpdatePreviewCell()">
          <option disabled value="">所属チーム</option>
          <option v-for="team in Teams" :key="team.TeamName">{{ team.TeamName }}</option>
        </select>
      </div>
      <span><img id="image" width='100px' @change="UpdatePreviewCell()" src=""></span>
      <input @change="fotoUp('PlayerInput')" id="PlayerInput" type="file" value="upload">
      <div>
      <button class="simpleBtn" v-if="!isLookon" @click="addPlayersRef(PreviewCell)">新規登録</button>
      <button class="simpleBtn" v-if="isLookon" @click="UpdatePlayersRef(PreviewCell)">保存</button>
      <p v-if="errorMessage">{{ errorMessage }}</p>
      </div>
    </div>
    <player-cell :PlayerInfo="PreviewCell" class="PlayerCell"></player-cell>
  </div>
</template>

<script>
import Mixin from '../../mixins/DB'
import PlayerCell from '@/components/PlayerCell.vue'
export default {
  mixins: [Mixin],
  components: {
    PlayerCell
  },
  data () {
    return {
      nowtime: new Date(),
      isLookon: false
    }
  },
  methods: {
    lookonToggle (Player, key) {
      if (!this.isLookon) {
        this.PreviewCell.key = key
        this.PlayerName = Player.name
        this.birthday = Player.birthday
        this.profile = Player.profile
        this.LeagueGC = Player.LeagueGC
        this.CupGC = Player.CupGC
        this.ClGC = Player.ClGC
        this.LeagueAC = Player.LeagueAC
        this.CupAC = Player.CupAC
        this.ClAC = Player.ClAC
        this.uniform = Player.uniform
        this.from = Player.from
        this.height = Player.height
        this.position = Player.position
        this.BelongTeam = Player.BelongTeam
        this.nowBT = Player.BelongTeam
        document.getElementById('image').src = Player.fotoURL
        this.UpdatePreviewCell()
      } else {
        this.clearFeald()
      }
      this.isLookon = !this.isLookon
    }
  },
  created () {
  }
}
</script>

<style scoped>
.EditField div label {
  width: 100px;
}
.PlayerCell {
  margin: 32px 0 0 64px;
  margin-right: 160px;
}
</style>
