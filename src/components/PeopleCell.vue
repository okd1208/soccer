<template>
  <div class="PeopleCellParent">
    <div class="PeopleCellChild"><slot></slot></div>
    <div class="PeopleCellChild profile">2</div>
    <div class="PeopleCellChild">3</div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.PeopleCellParent {
  display: flex;
}

.PeopleCellChild {
  width: 160px;
  background-color: rgb(172, 189, 172);
  height: 160px;
}

.profile{
  flex-grow: 1;
  background-color: rgb(171, 240, 171);
}

.PeopleCellChild > img {
  width: 160px;
  height: 160px;
}
</style>
