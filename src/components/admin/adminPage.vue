<template>
  <div class="parent">
    <admin-sidebar></admin-sidebar>
    <router-view class="adminMaincont"/>
  </div>
</template>

<script>
import AdminSidebar from './sidebar.vue'
export default {
  name: 'App',
  components: {
    AdminSidebar
  }
}
</script>

<style>
@import "../../css/styles.css";
</style>
