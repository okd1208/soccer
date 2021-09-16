import firebase from 'firebase'
export default {
  data () {
    return {
      db: null,
      ref: null,
      // Player
      PlayersRef: null,
      Players: null,
      PlayerName: null,
      birthday: null,
      profile: null,
      LeagueGC: null,
      CupGC: null,
      ClGC: null,
      LeagueAC: null,
      CupAC: null,
      ClAC: null,
      uniform: null,
      from: null,
      height: null,
      position: null,
      BelongTeam: null,
      nowBT: undefined,
      PreviewCell: {name: 'name', profile: 'profile', birthday: null, fotoURL: null, LeagueGC: null, CupGC: null, ClGC: null, LeagueAC: null, CupAC: null, ClAC: null, AbilityScore: [50, 50, 50, 50, 50], uniform: null, from: null, height: null, position: null, key: null, BelongTeam: null},
      // Teams
      TeamsRef: null,
      Teams: null,
      TeamName: null,
      TeamMenber: [],
      targetItem: false,
      // Event
      EventRef: null,
      Event: null,
      EventName: null,
      EventType: null,
      ParticipatingTeam: []
    }
  },
  methods: {
    TotalScore (League, Cup, Cl) {
      return League + Cup + Cl
    },
    async addPlayersRef (PreviewInfo) {
      await this.PlayersRef.add({
        name: PreviewInfo.name,
        profile: PreviewInfo.profile,
        LeagueGC: Number(PreviewInfo.LeagueGC),
        CupGC: Number(PreviewInfo.CupGC),
        ClGC: Number(PreviewInfo.ClGC),
        LeagueAC: Number(PreviewInfo.LeagueAC),
        CupAC: Number(PreviewInfo.CupAC),
        ClAC: Number(PreviewInfo.ClAC),
        uniform: Number(PreviewInfo.uniform),
        from: PreviewInfo.from,
        height: Number(PreviewInfo.height),
        birthday: PreviewInfo.birthday,
        position: PreviewInfo.position,
        fotoURL: document.getElementById('image').src,
        AbilityScore: PreviewInfo.AbilityScore
      })
      this.UpdateBT()
    },
    UpdateBT () {
      if (this.nowBT !== this.BelongTeam) {
        if (this.nowBT !== undefined) {
          this.TeamsRef.where('TeamName', '==', this.nowBT).get().then(snapShot => {
            snapShot.forEach(doc => {
              this.TeamsRef.doc(doc.id).update({
                Menber: firebase.firestore.FieldValue.arrayRemove(this.PlayerName)
              })
            })
          })
        }
        if (!this.BelongTeam) {
          this.clearFeald()
        }
        this.TeamsRef.where('TeamName', '==', this.BelongTeam).get().then(snapShot => {
          snapShot.forEach(async doc => {
            await this.TeamsRef.doc(doc.id).update({
              Menber: firebase.firestore.FieldValue.arrayUnion(this.PlayerName)
            })
            this.$router.go({path: this.$router.currentRoute.path, force: false})
          })
        })
      } else {
        this.clearFeald()
      }
    },
    async UpdatePlayersRef (PreviewInfo) {
      await this.PlayersRef.doc(this.PreviewCell.key).update({
        name: PreviewInfo.name,
        profile: PreviewInfo.profile,
        LeagueGC: Number(PreviewInfo.LeagueGC),
        CupGC: Number(PreviewInfo.CupGC),
        ClGC: Number(PreviewInfo.ClGC),
        LeagueAC: Number(PreviewInfo.LeagueAC),
        CupAC: Number(PreviewInfo.CupAC),
        ClAC: Number(PreviewInfo.ClAC),
        uniform: Number(PreviewInfo.uniform),
        from: PreviewInfo.from,
        height: Number(PreviewInfo.height),
        birthday: PreviewInfo.birthday,
        position: PreviewInfo.position,
        fotoURL: document.getElementById('image').src,
        AbilityScore: PreviewInfo.AbilityScore
      })
      this.UpdateBT()
    },
    addTeamsRef () {
      this.TeamsRef.add({
        TeamName: this.TeamName,
        Menber: this.TeamMenber,
        fotoURL: document.getElementById('image').src
      })
    },
    addEventRef () {
      this.EventRef.add({
        EventName: this.EventName,
        ParticipatingTeam: this.ParticipatingTeam,
        EventType: this.EventType,
        fotoURL: document.getElementById('image').src
      })
    },
    async UpdateTeamsRef () {
      await this.TeamsRef.doc(this.PreviewCell.key).update({
        TeamName: this.TeamName,
        Menber: this.TeamMenber,
        fotoURL: document.getElementById('image').src
      })
      this.$router.go({path: this.$router.currentRoute.path, force: false})
    },
    // 新規追加
    UpdatePreviewCell () {
      this.PreviewCell.name = this.PlayerName
      this.PreviewCell.birthday = this.birthday
      this.PreviewCell.profile = this.profile
      this.PreviewCell.LeagueGC = this.LeagueGC
      this.PreviewCell.CupGC = this.CupGC
      this.PreviewCell.ClGC = this.ClGC
      this.PreviewCell.LeagueAC = this.LeagueAC
      this.PreviewCell.CupAC = this.CupAC
      this.PreviewCell.ClAC = this.ClAC
      this.PreviewCell.uniform = this.uniform
      this.PreviewCell.from = this.from
      this.PreviewCell.height = this.height
      this.PreviewCell.position = this.position
      this.PreviewCell.fotoURL = document.getElementById('image').src
    },
    fotoUp (inputFileId) {
      var image
      var files
      var refClone
      files = document.getElementById(inputFileId).files
      image = files[0]
      if (inputFileId === 'PlayerInput') {
        this.ref = firebase.storage().ref().child('images/Player/' + this.PlayerName)
      } else if (inputFileId === 'TeamInput') {
        this.ref = firebase.storage().ref().child('images/Team/' + this.TeamName)
      } else if (inputFileId === 'EventInput') {
        this.ref = firebase.storage().ref().child('images/Event/' + this.EventName)
      }
      refClone = this.ref
      this.ref.put(image).then(function (snapshot) {
        alert('アップロードしました')
        refClone.getDownloadURL().then((downloadURL) => {
          document.getElementById('image').src = downloadURL
        })
      })
      // 非同期でthis.UpdatePreviewCell()
    },
    getTeamIcon (teamname, imgid) {
      if (!teamname) {
        return
      }
      firebase.storage().ref().child('images/Team/' + teamname).getDownloadURL().then((url) => {
        document.getElementById(imgid).src = url
      })
    },
    async deleteItem (ItemId, ref) {
      let name = ''
      if (ref === 'Players') {
        name = this.Players[ItemId].name
        ref = this.PlayersRef
      } else if (ref === 'Teams') {
        name = this.Teams[ItemId].TeamName
        ref = this.TeamsRef
      } else if (ref === 'Event') {
        name = this.Event[ItemId].EventName
        ref = this.EventRef
      }
      var result = window.confirm(name + 'を削除しますか？')
      if (result) {
        await ref.doc(ItemId).delete()
      }
      if (result) {
        this.$router.go({path: this.$router.currentRoute.path, force: false})
      }
    },
    clearFeald () {
      this.PlayerName = null
      this.birthday = null
      this.profile = null
      this.LeagueGC = null
      this.CupGC = null
      this.ClGC = null
      this.LeagueAC = null
      this.CupAC = null
      this.ClAC = null
      this.uniform = null
      this.from = null
      this.height = null
      this.position = null
      this.BelongTeam = null
      this.nowBT = undefined
      this.TeamMenber = null
      this.TeamName = null
      this.EventName = null
      this.ParticipatingTeam = []
      this.EventType = null
      document.getElementById('image').src = null
      this.UpdatePreviewCell()
      this.moveTop()
    },
    moveTop () {
      const duration = 200 // 移動速度（1秒で終了）
      const interval = 25 // 0.025秒ごとに移動
      const step = -window.scrollY / Math.ceil(duration / interval) // 1回に移動する距離
      const timer = setInterval(() => {
        window.scrollBy(0, step) // スクロール位置を移動
        if (window.scrollY <= 0) {
          clearInterval(timer)
        }
      }, interval)
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
    })
    this.TeamsRef = this.db.collection('Team')
    this.TeamsRef.onSnapshot(querySnapshot => {
      const obj = {}
      querySnapshot.forEach(doc => {
        obj[doc.id] = doc.data()
      })
      this.Teams = obj
    })
    this.EventRef = this.db.collection('Event')
    this.EventRef.onSnapshot(querySnapshot => {
      const obj = {}
      querySnapshot.forEach(doc => {
        obj[doc.id] = doc.data()
      })
      this.Event = obj
      // var key = Object.keys(obj)
      // console.log(key)
    })
  },
  computed: {
  }
}
