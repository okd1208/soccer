<template>
  <div id="app">
    <div v-if="!isAdminPage()">
      <header-parts class="headerParts"/>
        <router-view/>
    </div>
    <div v-if="isAdminPage()">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Mixin from './mixins/DB'
import headerParts from './components/HeaderParts.vue'
import AdminSidebar from './components/admin/sidebar.vue'
export default {
  name: 'App',
  mixins: [Mixin],
  components: {
    headerParts,
    AdminSidebar
  },
  methods: {
    isAdminPage () {
      const path = this.$route.path.split('/')
      if (path.indexOf('admin') !== -1) {
        return true
      } else {
        return false
      }
    }
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
</style>
