import firebase from 'firebase'
export default {
  data () {
    return {
      db: null,
      room: 'Player',
      PlayersRef: null,
      Players: null,
      ref: null,
      PlayerName: null,
      PlayerBirthiday: null,
      attack: null,
      profile: null,
      fotoURL: null,
      PreviewCell: {name: 'name', profile: 'profile', attack: 0, Birthiday: null, fotoURL: null}
    }
  },
  methods: {
    PickupScore (ScoreArray, i) {
      return ScoreArray[i]
    },
    TotalScore (ScoreArray) {
      return ScoreArray[0] + ScoreArray[1] + ScoreArray[2]
    },
    addDB (PreviewInfo) {
      console.log('start')
      this.PlayersRef.add({
        name: PreviewInfo.name,
        birthday: PreviewInfo.birthday,
        profile: PreviewInfo.profile,
        status: PreviewInfo.attack,
        fotoURL: document.getElementById('image').src
      })
      console.log('goal')
    },
    // 新規追加
    UpdatePreviewCell () {
      this.PreviewCell.name = this.PlayerName
      this.PreviewCell.birthday = this.birthday
      this.PreviewCell.attack = this.attack
      this.PreviewCell.profile = this.profile
      this.PreviewCell.fotoURL = document.getElementById('image').src
    },
    fotoUp (inputFileId) {
      var image
      var files
      var refClone
      files = document.getElementById(inputFileId).files
      image = files[0]
      this.ref = firebase.storage().ref().child('images/Player/' + this.PlayerName)
      refClone = this.ref
      this.ref.put(image).then(function (snapshot) {
        alert('アップロードしました')
        refClone.getDownloadURL().then((downloadURL) => {
          document.getElementById('image').src = downloadURL
        })
      })
      // 非同期でthis.UpdatePreviewCell()
    }
  },
  created () {
    this.db = firebase.firestore()
    this.PlayersRef = this.db.collection('Player')
    this.PlayersRef.onSnapshot(querySnapshot => {
      const obj = {}
      querySnapshot.forEach(doc => {
        obj[doc.id] = doc.data()
      })
      this.Players = obj
      var key = Object.keys(obj)
      console.log(key)
    })
  },
  computed: {
  }
}
