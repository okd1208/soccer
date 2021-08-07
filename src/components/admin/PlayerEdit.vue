<template>
  <div>
    <!-- <ul>
      <li v-for="Player in Players" :key="Player.id">{{ Player }}
      </li>
    </ul> -->
    <player-cell v-for="Player in Players" :key="Player.name" :PlayerInfo="Player" class="PlayerCell"></player-cell>
    <div class="EditField">
      <h3>選手情報登録</h3>
      <div><label class="NewPlayerLabel">name</label><input @change="UpdatePreviewCell()" v-model="PlayerName" type="text"></div>
      <div><label class="NewPlayerLabel">atak</label><input v-model="attack" type="number"></div>
      <div><label class="NewPlayerLabel">profile</label><input @change="UpdatePreviewCell()" v-model="profile" type="text"></div>
      <div><label class="NewPlayerLabel">birthday</label><input v-model="birthday" type="date"></div>
      <span><img id="image" width='100px' @change="UpdatePreviewCell()" src=""></span>
      <input @change="fotoUp('testfileId')" id="testfileId" type="file" value="upload">
      <button @click="addDB(PreviewCell)">addDB</button>
    </div>
    <player-cell :PlayerInfo="PreviewCell" class="PlayerCell"></player-cell>
  </div>
</template>

<script>
import Mixin from '../../mixin'
import PlayerCell from '../PlayerCell.vue'
export default {
  mixins: [Mixin],
  components: {
    PlayerCell
  },
  data () {
    return {
      nowtime: new Date()
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.EditField {
  margin-top: 62px;
  background-color: rgb(228, 250, 228);
  padding: 32px 0px;
  margin-right: 160px;
}

.NewPlayerLabel {
  width: 100px;
}

.PlayerCell {
  margin: 32px 0 0 64px;
  margin-right: 160px;
}
</style>
