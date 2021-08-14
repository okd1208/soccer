import firebase from 'firebase'
export default {
  data () {
    return {
      db: null,
      ref: null,
      fotoURL: null,
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
      PreviewCell: {name: 'name', profile: 'profile', birthday: '2020-01-01', fotoURL: null, LeagueGC: null, CupGC: null, ClGC: null, LeagueAC: null, CupAC: null, ClAC: null, AbilityScore: [50, 50, 50, 50, 50], uniform: null, from: null, height: null, position: null, BelongTeam: null},
      // Teams
      TeamsRef: null,
      Teams: null,
      TeamName: null,
      TeamMenber: [],
      TargetInfo: {
        type: Object,
        default: this.PreviewCell
      }
    }
  },
  methods: {
    TotalScore (League, Cup, Cl) {
      return League + Cup + Cl
    },
    addPlayersRef (PreviewInfo) {
      this.PlayersRef.add({
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
        BelongTeam: PreviewInfo.BelongTeam,
        fotoURL: document.getElementById('image').src,
        AbilityScore: PreviewInfo.AbilityScore
      })
    },
    addTeamsRef () {
      this.TeamsRef.add({
        TeamName: this.TeamName,
        Menber: this.TeamMenber,
        fotoURL: document.getElementById('image').src
      })
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
      this.PreviewCell.BelongTeam = this.BelongTeam
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
      this.ref = firebase.storage().ref().child('images/Team/' + teamname)
      this.ref.getDownloadURL().then((url) => {
        document.getElementById(imgid).src = url
      })
    },
    deleteItem (ItemId) {
      var result = window.confirm(this.Players[ItemId].name + 'を削除しますか？')
      if (result) {
        this.PlayersRef.doc(ItemId).delete()
      }
    },
    async SetEditTarget (key) {
      console.log(key)
      const info = await this.PlayersRef.doc(key).get()
      console.log(info.data())
      this.TargetInfo = info.data()
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
      // var key = Object.keys(obj)
      // console.log(key)
    })
    this.TeamsRef = this.db.collection('Team')
    this.TeamsRef.onSnapshot(querySnapshot => {
      const obj = {}
      querySnapshot.forEach(doc => {
        obj[doc.id] = doc.data()
      })
      this.Teams = obj
      // var key = Object.keys(obj)
      // console.log(key)
    })
  },
  computed: {
  }
}
