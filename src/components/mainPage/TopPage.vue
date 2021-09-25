<template>
  <header>
    <div class="topPage">
      <ul class="tabs">
        <li v-on:click="changeView('1')" v-bind:class="{'active': isActive === '1'}">リーグ</li>
        <li v-on:click="changeView('2')" v-bind:class="{'active': isActive === '2'}">カップ</li>
        <li v-on:click="changeView('3')" v-bind:class="{'active': isActive === '3'}">CL・EL</li>
      </ul>
      <div v-if="isActive === '1'">
        <event-cont v-for="event in leagueEvent" :key="event.EventName" :EventInfo="event"></event-cont>
      </div>
      <div v-if="isActive === '2'">
        <event-cont v-for="event in cupEvent" :key="event.EventName" :EventInfo="event"></event-cont>
      </div>
      <div v-if="isActive === '3'">
        <event-cont v-for="event in clelEvent" :key="event.EventName" :EventInfo="event"></event-cont>
      </div>
    </div>
  </header>
</template>

<script>
import EventCont from '../EventCont.vue'
import Mixin from '../../mixins/DB'
export default {
  name: 'TopPage',
  mixins: [Mixin],
  components: {
    EventCont
  },
  data () {
    return {
      isActive: '2'
    }
  },
  computed: {
  },
  methods: {
    changeView (num) {
      this.isActive = num
    }
  },
  created () {
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
.tabs {
  margin-top: 32px;
}
.tabs li {
  list-style: none;
  display: inline;
  padding: 16px;
  font-size: 20px;
  font-weight: bold;
  text-shadow: 0 -1px 0 rgba(0,0,0,.2);
  color: aliceblue;
  border-radius: 5px 5px 0 0;
  background: LightGray;
}
.active {
  background: rgb(132, 174, 228) !important;
}
.topPage div {
  /* background-color: rgba(233, 239, 243, 0.24); */
}
</style>
