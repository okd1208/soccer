<template>
  <div class="LeftArea">
    <p>リーグ別で見る</p>
    <ul>
      <li>
        <img class="LeftAreaImg" src="../assets/kasima.png">
        <p>KASIMA</p>
      </li>
      <li>
        <img class="LeftAreaImg" src="../assets/vissel.png">
        <p>VISSEL</p>
      </li>
      <li>
        <img class="LeftAreaImg" src="../assets/kawasaki.png">
        <p>KAWASIMA</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'LeftArea'
}
</script>

<style>
.LeftArea {
  /* width: 300px; */
  margin: 30px 30px 0px 100px;
  background-color: rgb(224, 219, 219);
}
.LeftArea > ul {
  list-style: none;
  padding: 0;
}
.LeftArea > ul > li{
  margin: 32px;
}
.LeftAreaImg {
  width: 120px;
  text-align: center;
}
</style>
