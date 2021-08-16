<template>
  <div id="app">
    <header-parts class="headerParts"/>
    <div class="parent">
      <left-area class="child side-child"/>
      <router-view class="child"/>
    </div>
  </div>
</template>

<script>
import headerParts from './components/HeaderParts.vue'
import LeftArea from './components/LeftArea.vue'
export default {
  name: 'App',
  components: {
    headerParts,
    LeftArea
  }
}
</script>

<style>
@import "./css/styles.css";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: -8px;
}

.parent {
  display: flex;
  height: 100%;
}

.child {
  width: 100%;
}

.side-child {
  flex-basis: 30%;
}
</style>
