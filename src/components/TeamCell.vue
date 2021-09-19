<template>
  <transition name="fade">
    <div v-if="!isLookon || targetItem" class="teamcell" @click="setTargetToggle(), $emit('lookonToggle', TeamInfo, ItemId)">
      <img :src="TeamInfo.fotoURL">
      <h5>{{ TeamInfo.TeamName }}</h5>
    </div>
  </transition>
</template>

<script>
import Mixin from '../mixins/DB'
export default {
  props: {
    'TeamInfo': {
      type: Object,
      default: ''
    },
    ItemId: String,
    isLookon: Boolean
  },
  mixins: [Mixin],
  data: function () {
    return {
    }
  },
  created () {
    if (!this.TeamInfo.fotoURL) {
      this.TeamInfo.fotoURL = require('../assets/default_icon_team.png')
    }
  },
  methods: {
    setTargetToggle () {
      this.targetItem = !this.targetItem
    }
  }
}
</script>

<style>
.teamcell {
  width: 20%;
  margin: 16px;
  background-color: rgba(32, 41, 78, 0.918);
  color: aliceblue;
}

.teamcell img {
  width: 60%;
}

.teamcell:hover {
  cursor: pointer;
  background-color: rgba(70, 85, 161, 0.918);
  transition:all 0.5s;
}
</style>
