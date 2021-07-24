<template>
  <header>
    <div class="topPage">
      <h1>TopPage</h1>
      <div v-for="image in images" :key="image.name">
        <people-cell class="peopleCell"><img :src="image.fotoURL"></people-cell>
      </div>
    </div>
  </header>
</template>

<script>
import PeopleCell from './PeopleCell.vue'
export default {
  name: 'TopPage',
  components: {
    PeopleCell
  },
  computed: {
    images () {
      return this.$store.state.images
    }
  }
}
</script>

<style>
.topPage {
  height: 1000px;
  margin-right: 160px;
}
.peopleCell {
  margin: 32px 0 0 64px;
}
</style>
