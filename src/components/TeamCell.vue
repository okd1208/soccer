<template>
  <div class="teamcell">
    <img :src="TeamInfo.fotoURL">
    <h5>{{ TeamInfo.TeamName }}</h5>
  </div>
</template>

<script>
export default {
  props: {
    'TeamInfo': {
      type: Object,
      default: ''
    }
  },
  data: function () {
    return {
    }
  },
  components: {
  },
  methods: {
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
  width: 80%;
}
</style>
