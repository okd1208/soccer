<template>
  <div class="parent topPage">
    <div class="LeftArea">
      <div>
        <div>
          <h5>リーグ別</h5>
          <ul>
            <li v-for="event in leagueEvent" :key="event.EventName">
              <img class="LeftAreaImg" :src="event.fotoURL">
              <p>{{ event.EventName }}</p>
            </li>
          </ul>
        </div>
        <div >
          <h5>カップ別</h5>
          <ul>
            <li v-for="event in cupEvent" :key="event.EventName">
              <img class="LeftAreaImg" :src="event.fotoURL">
              <p>{{ event.EventName }}</p>
            </li>
          </ul>
        </div>
        <div >
          <h5>clel別</h5>
          <ul>
            <li v-for="event in clelEvent" :key="event.EventName">
              <img class="LeftAreaImg" :src="event.fotoURL">
              <p>{{ event.EventName }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="mainCont">
      <div v-if="$store.state.viewNum === 1">
        <event-cont v-for="event in leagueEvent" :key="event.EventName" :EventInfo="event"></event-cont>
      </div>
      <div v-if="$store.state.viewNum === 2">
        <event-cont v-for="event in cupEvent" :key="event.EventName" :EventInfo="event"></event-cont>
      </div>
      <div v-if="$store.state.viewNum === 3">
        <event-cont v-for="event in clelEvent" :key="event.EventName" :EventInfo="event"></event-cont>
      </div>
    </div>
  </div>
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
    }
  }
}
</script>

<style>
.topPage {
  margin-bottom: 120px;
}
.mainCont {
  width: 70%;
  margin-right: 160px;
}
.mainCont > div {
  background-color: rgba(56, 122, 209, 0.041);
}
.PlayerCell {
  margin: 32px 0 0 64px;
}
.LeftArea {
  height: auto;
  width: 20%;
  margin: 30px 30px 0px 100px;
}
.LeftArea > div {
  background-color: rgba(224, 219, 219, 0.452);
  padding: 32px 0;
}
.LeftArea div ul {
  list-style: none;
  padding: 0;
}
.LeftArea div ul li{
  margin: 32px;
}
.LeftAreaImg {
  width: 120px;
  text-align: center;
}
</style>
