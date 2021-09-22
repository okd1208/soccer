<template>
  <div>
    <player-cell @lookonToggle="lookonToggle" v-for="(Player,key) in Players" :key="key" :isLookon="isLookon" :ItemId="key" :PlayerInfo="Player" :IsEdit=true class="PlayerCell"></player-cell>
    <div class="EditField">
      <h3 v-if="!isLookon">新規登録</h3>
      <h3 v-if="isLookon">編集</h3>
      <div class="cp_iptxt">
        <input class="ef" type="text" placeholder="" @change="UpdatePreviewCell()" v-model="PlayerName">
        <label>選手名</label>
        <span class="focus_line"></span>
      </div>
      <div class="cp_iptxt">
        <input class="ef" type="text" placeholder="" @change="UpdatePreviewCell()" v-model="from">
        <label>出身</label>
        <span class="focus_line"></span>
      </div>
      <div class="ThreeInputEria parent-wrap">
        <div class="cp_iptxt"><input class="ef" @change="UpdatePreviewCell()" v-model="LeagueGC" type="number">
          <label>リーグGC</label>
          <span class="focus_line"></span>
        </div>
        <div class="cp_iptxt"><input class="ef" @change="UpdatePreviewCell()" v-model="CupGC" type="number">
          <label>カップGC</label>
          <span class="focus_line"></span>
        </div>
        <div class="cp_iptxt"><input class="ef" @change="UpdatePreviewCell()" v-model="ClGC" type="number">
          <label>CL.ELGC</label>
          <span class="focus_line"></span>
        </div>
      </div>
      <div class="ThreeInputEria parent-wrap">
        <div class="cp_iptxt"><input class="ef" @change="UpdatePreviewCell()" v-model="LeagueAC" type="number">
          <label>リーグAC</label>
          <span class="focus_line"></span>
        </div>
        <div class="cp_iptxt"><input class="ef" @change="UpdatePreviewCell()" v-model="CupAC" type="number">
          <label>カップAC</label>
          <span class="focus_line"></span>
        </div>
        <div class="cp_iptxt"><input class="ef" @change="UpdatePreviewCell()" v-model="ClAC" type="number">
          <label>CL.ELAC</label>
          <span class="focus_line"></span>
        </div>
      </div>
      <div class="ThreeInputEria parent-wrap">
        <div class="cp_iptxt"><input class="ef" @change="UpdatePreviewCell()" v-model="height" type="number">
          <label>身長</label>
          <span class="focus_line"></span>
        </div>
        <div class="cp_iptxt"><input class="ef" @change="UpdatePreviewCell()" v-model="uniform" type="number">
          <label>Uniform</label>
          <span class="focus_line"></span>
        </div>
        <div class="cp_iptxt"><input class="ef" @change="UpdatePreviewCell()" v-model="birthday" type="date">
          <label></label>
          <span class="focus_line"></span>
        </div>
      </div>
      <div class="TwoInputEria parent-wrap">
        <div class="cp_iptxt"><select class="ef" @change="UpdatePreviewCell()" v-model="position" type="text">
          <option disabled value="">ポジション</option>
          <option>FW(フォワード)</option>
          <option>MF(サイドハーフ)</option>
          <option>MF(トップ下)</option>
          <option>MF(ボランチ)</option>
          <option>DF(サイドバック)</option>
          <option>DF(センターバック)</option>
          <option>GK（ゴールキーパー）</option>
        </select>
          <label>ポジション</label>
          <span class="focus_line"></span>
        </div>
        <div class="cp_iptxt"><select class="ef" @change="UpdatePreviewCell()" v-model="BelongTeam" type="text">
          <option disabled value="">所属チーム</option>
          <option v-for="team in Teams" :key="team.TeamName">{{ team.TeamName }}</option>
        </select>
          <label>チーム</label>
          <span class="focus_line"></span>
        </div>
      </div>
      <input @change="fotoUp()" id="PlayersInput" v-bind:disabled="!isEditable" type="file">
      <span><img id="image" width='100px' @change="UpdatePreviewCell()" src=""></span>
      <div class="cp_iptxt">
        <textarea rows="6" cols="60" class="profile-textarea" type="text" placeholder="プロフィール" @change="UpdatePreviewCell()" v-model="profile"></textarea>
      </div>
      <div>
      <loading-icon v-show="loading"></loading-icon>
      <button class="simpleBtn" v-bind:disabled="!isEditable" v-if="!isLookon" @click="addPlayersRef(PreviewCell)">新規登録</button>
      <button class="simpleBtn" v-if="isLookon" @click="UpdatePlayersRef(PreviewCell)">保存</button>
      <p v-if="errorMessage">{{ errorMessage }}</p>
      </div>
    </div>
    <!-- <player-cell @lookonToggle="lookonToggle" :key="key" :isLookon="isLookon" :ItemId="key" :PlayerInfo="PreviewCell" :IsEdit=false class="PlayerCell"></player-cell> -->
    <player-cell :PlayerInfo="PreviewCell" class="PlayerCell"></player-cell>
  </div>
</template>

<script>
import Mixin from '../../mixins/DB'
import PlayerCell from '@/components/PlayerCell.vue'
import LoadingIcon from '../Loading.vue'
export default {
  mixins: [Mixin],
  components: {
    PlayerCell,
    LoadingIcon
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
        this.nowName = Player.name
        this.storagePath = Player.storagePath
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
.ThreeInputEria div {
  width: 20% !important;
}
.profile-textarea {
  width: 80%;
}
.TwoInputEria div {
  width: 40% !important;
}
</style>
