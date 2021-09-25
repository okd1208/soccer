<template>
  <div class="EventCont">
    <img :src="EventInfo.fotoURL">
    <div>
     <player-cell v-for="Player in participants" :key="Player.name" :PlayerInfo="Player" class="PlayerCell"></player-cell>
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
      participants: []
    }
  },
  components: {
    PlayerCell
  },
  methods: {
  },
  created () {
    this.EventInfo.ParticipatingTeam.forEach(element => {
      this.TeamsRef.where('TeamName', '==', element).get().then(snapShot => {
        snapShot.forEach(doc => {
          doc.data().Menber.forEach(e => {
            this.PlayersRef.where('name', '==', e).get().then(snapShot => {
              snapShot.forEach(doc => {
                this.participants.push(doc.data())
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
