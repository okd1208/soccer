<template>
  <header>
    <div class="topPage">
      <h1>TopPage</h1>
      <people-cell class="peopleCell"/>
      <people-cell class="peopleCell"/>
      <people-cell class="peopleCell"/>
      <people-cell class="peopleCell"/>
      <people-cell class="peopleCell"/>
      <people-cell class="peopleCell"/>
    </div>
  </header>
</template>

<script>
import PeopleCell from './PeopleCell.vue'
export default {
  name: 'TopPage',
  components: {
    PeopleCell
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
