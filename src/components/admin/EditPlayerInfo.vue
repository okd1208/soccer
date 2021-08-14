<template>
  <div>
    <player-cell :PlayerInfo="this.TargetInfo"></player-cell>
  </div>
</template>

<script>
import PlayerCell from '../PlayerCell.vue'
import Mixin from '../../mixin'
export default {
  mixins: [Mixin],
  components: {
    PlayerCell
  },
  data () {
    return {
    }
  },
  created () {
    this.SetEditTarget(this.$route.params.id)
  }
}
</script>
