<template>
  <div class="parent">
    <div class="child">
      <p>ゴール数: 6</p>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">リーグ</th>
            <th scope="col">カップ</th>
            <th scope="col">CL・EL</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>3</td>
            <td>4</td>
            <td>10</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="child">
      <p>アシスト数: 15</p>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">リーグ</th>
            <th scope="col">カップ</th>
            <th scope="col">CL・EL</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>3</td>
            <td>4</td>
            <td>10</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default ({
})
</script>

<style scoped>
.parent {
  display: flex;
}

.child {
  margin: 16px;
}
</style>
