<template>
  <div>
    <div class="PlayerCellParent">
      <div class="PlayerCellChild"><img :src="TeamInfo.fotoURL"></div>
      <div class="PlayerCellChild profile">
        <h5>{{ TeamInfo.TeamName }}</h5>
        <p class="PlayerProfile">{{ TeamInfo.TeamName }}</p>
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
.PlayerCellParent {
  display: flex;
}

.PlayerCellChild {
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

.PlayerCellChild > img {
  width: 160px;
  height: 160px;
}

.PlayerProfile {
  font-size: 12px;
}

.moreBtn {
  float: right;
  margin: 0 16px 16px 0;
}
</style>
