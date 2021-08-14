<template>
  <div>
    <div class="TeamCellParent">
      <div class="TeamCellChild"><img :src="TeamInfo.fotoURL"></div>
      <div class="TeamCellChild profile">
        <h5>{{ TeamInfo.TeamName }}</h5>
        <p class="TeamProfile">{{ TeamInfo.TeamName }}</p>
      </div>
    </div>
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
.TeamCellParent {
  display: flex;
}

.TeamCellChild {
  width: 160px;
  /* background-color: rgb(172, 189, 172); */
  height: 160px;
}

.profile{
  flex-grow: 1;
  background-color: rgb(233, 240, 233);
  text-align: left;
  padding: 16px 0 0 32px;
}

.TeamCellChild > img {
  width: 160px;
  height: 160px;
}

.TeamProfile {
  font-size: 12px;
}

.moreBtn {
  float: right;
  margin: 0 16px 16px 0;
}
</style>
