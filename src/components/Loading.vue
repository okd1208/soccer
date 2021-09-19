<template>
  <div>
    <div class="fullview">
      <div class="loading-spacer"></div>
      <vue-loading type="bubbles" color="#4d86f0" :size="{ width: '50px', height: '50px' }">
      </vue-loading>
    </div>
  </div>
</template>

<script>
import { VueLoading } from 'vue-loading-template'

export default {
  name: 'loading',
  components: {
    VueLoading
  }
}
</script>

<style>
/* .fullview {
  width: 100%;
  height: 100%;
  background: #fefefe;
  position: fixed;
  top: 0;
  left: 0;
} */
.loading-spacer {
  height: 30%;
  color: #4d86f0;
}
</style>
