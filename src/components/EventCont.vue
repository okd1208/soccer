<template>
  <div class="EventCont">
    <img :src="EventInfo.fotoURL">
    <div>
     <player-cell v-for="(Player,key) in participants" :key="key" :PlayerInfo="Player" :ItemId="key" class="PlayerCell"></player-cell>
    </div>
  </div>
</template>

<script>
import Mixin from '../mixins/DB'
import PlayerCell from './PlayerCell.vue'
export default {
  props: {
    'EventInfo': {
      type: Object,
      default: ''
    }
  },
  mixins: [Mixin],
  data: function () {
    return {
      participants: {}
    }
  },
  components: {
    PlayerCell
  },
  methods: {
  },
  created () {
    const obj = {}
    this.EventInfo.ParticipatingTeam.forEach(element => {
      this.TeamsRef.where('TeamName', '==', element).get().then(snapShot => {
        snapShot.forEach(doc => {
          doc.data().Menber.forEach(e => {
            this.PlayersRef.where('name', '==', e).get().then(snapShot => {
              snapShot.forEach(doc => {
                obj[doc.id] = doc.data()
                this.participants = obj
              })
            })
          })
        })
      })
    })
  }
}
</script>

<style scoped>
.PlayerCell {
  margin: 32px 0 0 64px;
}
.EventCont {
  padding: 32px 0;
}
.EventCont img {
  width: 200px;
}
</style>
