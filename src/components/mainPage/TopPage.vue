<template>
  <header>
    <div class="topPage">
      <h1>TopPage</h1>
      <player-cell v-for="Player in Players" :key="Player.name" :PlayerInfo="Player" class="PlayerCell"></player-cell>
    </div>
  </header>
</template>

<script>
import PlayerCell from '../PlayerCell.vue'
import Mixin from '../../mixins/DB'
export default {
  name: 'TopPage',
  mixins: [Mixin],
  components: {
    PlayerCell
  },
  computed: {
    // Players () {
    //   return this.$store.state.Players
    // }
  }
}
</script>

<style>
.topPage {
  height: 1000px;
  margin-right: 160px;
}
.PlayerCell {
  margin: 32px 0 0 64px;
}
</style>
