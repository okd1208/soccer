<template>
  <div class="adminSidebar">
    <ul>
      <li><router-link to="/admin/PlayerEdit">選手情報変更</router-link></li>
      <li><router-link to="/admin/TeamEdit">チーム情報変更</router-link></li>
      <li><router-link to="/admin/event">イベント編集</router-link></li>
      <li><router-link to="/">編集画面を抜ける</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.adminSidebar {
  background-color: rgb(49, 47, 47);
  width: 260px;
  position: sticky;
  height: 100vh;
  top: 0;
  margin-right: 16px;
}

.adminSidebar ul {
  margin-top: 32px;
}

.adminSidebar ul li {
  margin: 16px 0;
  list-style: none;
}

.adminSidebar ul li a {
  color: white;
}
</style>
