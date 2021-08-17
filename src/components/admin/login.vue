<template>
<div>
  <div class="signin">
    <button class="btn btn-primary mb-3" @click="logoutUser">ログアウト</button>
    <table>
        <tr>
          <th>メールアドレス：</th>
        </tr>
        <tr>
          <td><input type="email" v-model="mailaddress"/></td>
        </tr>
        <tr>
          <th>パスワード：</th>
        </tr>
        <tr>
          <td><input type="password" v-model="password"/></td>
        </tr>
      </table>
      <button @click="login">ログイン</button>
  </div>
  <div id="firebaseui-auth-container"></div>
</div>
</template>

<script>
import Mixin from '../../mixin'
import firebase from 'firebase'
export default {
  mixins: [Mixin],
  data () {
    return {
      mailaddress: null,
      password: null
    }
  },
  methods: {
    logoutUser () {
      firebase.auth().signOut()
    },
    login () {
      firebase.auth().signInWithEmailAndPassword(this.mailaddress, this.password)
        .then((userCredential) => {
          var user = userCredential.user
          console.log(user)
          this.$router.push('/admin')
        })
        .catch((error) => {
          var errorCode = error.code
          console.log(errorCode)
          var errorMessage = error.message
          console.log(errorMessage)
        })
    }
  }
}
</script>

<style>
</style>
