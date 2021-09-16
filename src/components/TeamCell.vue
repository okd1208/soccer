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
  components: {
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
  background-color: rgba(11, 19, 58, 0.918);
  color: aliceblue;
}

.teamcell img {
  width: 60%;
}

.teamcell:hover {
  cursor: pointer;
  background-color: rgba(46, 56, 105, 0.918);
  transition:all 0.5s;
}
</style>
