<template>
  <header>
    <div class="headerParts parent">
      <div class="siteTitle">ページタイトル</div>
      <div class="viewSlect">
        <div v-on:click="changeView(1)"><div v-bind:class="{'active': $store.state.viewNum === 1}"><font-awesome-icon icon="chart-line" /></div>リーグ</div>
        <div v-on:click="changeView(2)"><div v-bind:class="{'active': $store.state.viewNum === 2}"><font-awesome-icon icon="trophy" /></div>カップ</div>
        <div v-on:click="changeView(3)"><div v-bind:class="{'active': $store.state.viewNum === 3}"><font-awesome-icon icon="futbol" /></div>CL・El</div>
      </div>
    </div>
  </header>
</template>

<script>
import Mixin from './../mixins/DB'
export default {
  mixins: [Mixin],
  methods: {
    changeView (num) {
      this.$store.state.viewNum = num
      if (this.$route.path !== '/') {
        this.$router.push({ path: '/' })
      }
    }
  }
}
</script>

<style>
.headerParts {
  height: 100px;
  background-color: rgb(255, 255, 255);
  position: sticky;
  top: 0;
  z-index: 99;
}

.headerParts > .siteTitle {
  user-select: none;
  line-height: 100px;
  margin: 0 32px;
  font-size: 24px;
  font-weight: bold;
}

.viewSlect {
  list-style: none;
  display: flex;
}

.viewSlect > div {
  margin: 0 32px;
  padding: 16px;
  font-size: 20px;
  font-weight: bold;
}

.viewSlect > div > div {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  line-height: 50px;
  margin: 0 auto;
}

.viewSlect > div:hover {
  cursor: pointer;
}

.active {
  background: rgb(204, 245, 255) !important;
}
</style>
