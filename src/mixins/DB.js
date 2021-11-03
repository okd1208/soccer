import firebase from 'firebase'
export default {
  data () {
    return {
      db: null,
      ref: null,
      errorMessage: null,
      isFotoUp: false,
      nowName: null,
      storagePath: null,
      newnewStoragePath: null,
      isEditable: false,
      loading: false,
      fotoURL: null,
      editingRef: null,
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
      AbilityScores: [],
      PreviewCell: {preview: true, AbilityScore: [50, 50, 50, 50, 50, 0], name: null, fotoURL: null, profile: null, birthday: null},
      DetailPlayerInfo: null,
      // Teams
      TeamsRef: null,
      Teams: null,
      TeamName: null,
      TeamMember: [],
      targetItem: false,
      // Event
      EventRef: null,
      Event: null,
      leagueEvent: null,
      cupEvent: null,
      clelEvent: null,
      EventName: null,
      EventType: null,
      ParticipatingTeam: []
    }
  },
  methods: {
    TotalScore (League, Cup, Cl) {
      return League + Cup + Cl
    },
    async checkForm () {
      this.UpdatePreviewCell()
      this.errorMessage = null
      // 編集画面
      if (this.nowName) {
        // this.fotoURL = document.getElementById('image').src
        if (this.isFotoUp) {
          if (this.storagePath) {
            const storagePathName = this.storagePath.split('/')
            this.deleteStorageItem(this.PreviewCell.collection + '/' + storagePathName[1])
          }
          this.storagePath = this.newStoragePath
          this.fotoURL = document.getElementById('image').src
        } else {
          if (this.storagePath) {
            this.fotoURL = document.getElementById('image').src
          }
        }
      } else {
        if (this.isFotoUp) {
          this.fotoURL = document.getElementById('image').src
          this.storagePath = this.newStoragePath
        }
      }

      if (this.PreviewCell.collection === 'Teams') {
        const teamName = this.TeamName
        const nowName = this.nowName
        if (this.nowName !== teamName) {
          this.EventRef.where('ParticipatingTeam', 'array-contains', nowName).get().then(snapShot => {
            snapShot.forEach(doc => {
              this.EventRef.doc(doc.id).update({
                ParticipatingTeam: firebase.firestore.FieldValue.arrayRemove(nowName)
              })
              this.EventRef.doc(doc.id).update({
                ParticipatingTeam: firebase.firestore.FieldValue.arrayUnion(teamName)
              })
            })
          })
        }
        if (this.TeamMember) {
          this.TeamMember.forEach(element => {
            this.TeamsRef.where('Member', 'array-contains', element).get().then(snapShot => {
              snapShot.forEach(doc => {
                if (teamName !== doc.data().TeamName) {
                  this.TeamsRef.doc(doc.id).update({
                    Member: firebase.firestore.FieldValue.arrayRemove(element)
                  })
                  alert(element + 'を' + doc.data().TeamName + 'から外しました。')
                }
              })
            })
          })
        }
      }
    },
    async UpdateBT () {
      if (this.nowBT !== undefined) {
        // 編集登録
        if (this.nowBT !== this.BelongTeam || this.nowName !== this.PlayerName) {
          // BT変更,もしくはnameの変更
          await this.TeamsRef.where('TeamName', '==', this.nowBT).get().then(snapShot => {
            snapShot.forEach(doc => {
              this.TeamsRef.doc(doc.id).update({
                Member: firebase.firestore.FieldValue.arrayRemove(this.nowName)
              })
            })
          })
        }
      }
      if (this.nowBT !== this.BelongTeam) {
        if (!this.BelongTeam) {
          this.clearFeald()
          return
        }
        await this.TeamsRef.where('TeamName', '==', this.BelongTeam).get().then(snapShot => {
          snapShot.forEach(doc => {
            this.TeamsRef.doc(doc.id).update({
              Member: firebase.firestore.FieldValue.arrayUnion(this.PlayerName)
            })
          })
        })
      } else if (this.nowName !== this.PlayerName && this.nowBT) {
        await this.TeamsRef.where('TeamName', '==', this.BelongTeam).get().then(snapShot => {
          snapShot.forEach(doc => {
            this.TeamsRef.doc(doc.id).update({
              Member: firebase.firestore.FieldValue.arrayUnion(this.PlayerName)
            })
          })
        })
      }
      this.clearFeald()
    },
    async addPlayersRef (PreviewInfo) {
      this.checkForm()
      if (this.errorMessage) {
        return
      }
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
        AbilityScore: PreviewInfo.AbilityScore,
        fotoURL: this.fotoURL,
        storagePath: this.storagePath
      })
      await this.UpdateBT()
      this.clearFeald()
    },
    async UpdatePlayersRef (PreviewInfo) {
      this.checkForm()
      if (this.errorMessage) {
        return
      }
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
        fotoURL: this.fotoURL,
        storagePath: this.storagePath
      })
      await this.UpdateBT()
      this.clearFeald()
    },
    async addTeamsRef () {
      this.checkForm()
      if (this.errorMessage) {
        return
      }
      await this.TeamsRef.add({
        TeamName: this.TeamName,
        Member: this.TeamMember,
        fotoURL: this.fotoURL,
        storagePath: this.storagePath
      })
      this.clearFeald()
      // this.$router.go({path: this.$router.currentRoute.path, force: false})
    },
    async UpdateTeamsRef () {
      await this.checkForm()
      if (this.errorMessage) {
        return
      }
      await this.TeamsRef.doc(this.PreviewCell.key).update({
        TeamName: this.TeamName,
        Member: this.TeamMember,
        fotoURL: this.fotoURL,
        storagePath: this.storagePath
      })
      this.clearFeald()
      // this.$router.go({path: this.$router.currentRoute.path, force: false})
    },
    async addEventRef () {
      this.checkForm()
      if (this.errorMessage) {
        return
      }
      await this.EventRef.add({
        EventName: this.EventName,
        ParticipatingTeam: this.ParticipatingTeam,
        EventType: this.EventType,
        fotoURL: this.fotoURL,
        storagePath: this.storagePath
      })
      this.clearFeald()
      // this.$router.go({path: this.$router.currentRoute.path, force: false})
    },
    async UpdateEventRef () {
      this.checkForm()
      if (this.errorMessage) {
        return
      }
      await this.EventRef.doc(this.PreviewCell.key).update({
        EventName: this.EventName,
        ParticipatingTeam: this.ParticipatingTeam,
        EventType: this.EventType,
        fotoURL: document.getElementById('image').src,
        storagePath: this.storagePath
      })
      this.clearFeald()
      // this.$router.go({path: this.$router.currentRoute.path, force: false})
    },
    // nameやkeyの受け渡しと、PlayerCellのプレビュー用
    UpdatePreviewCell () {
      if (this.PreviewCell.collection === 'Players') {
        this.PreviewCell.name = this.PlayerName
      } else if (this.PreviewCell.collection === 'Teams') {
        this.PreviewCell.name = this.TeamName
      } else if (this.PreviewCell.collection === 'Event') {
        this.PreviewCell.name = this.EventName
      }
      if (this.PreviewCell.name && this.PreviewCell.name !== '') {
        this.isEditable = true
      } else {
        this.isEditable = false
      }
      this.PreviewCell.storagePath = this.storagePath
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
    async fotoUp () {
      this.loading = true
      this.isEditable = false
      var image
      var files
      var refClone
      files = document.getElementById(this.PreviewCell.collection + 'Input').files
      image = files[0]
      this.ref = firebase.storage().ref().child('images/' + this.PreviewCell.collection + '/' + this.PreviewCell.name)
      refClone = this.ref
      await this.ref.put(image).then(function (snapshot) {
        refClone.getDownloadURL().then((downloadURL) => {
          document.getElementById('image').src = downloadURL
        })
      })
      // 非同期でthis.UpdatePreviewCell()
      this.newStoragePath = this.PreviewCell.collection + '/' + this.PreviewCell.name
      this.isFotoUp = true
      this.isEditable = true
      this.loading = false
    },
    async changeIcon (storagePath, changeImgId) {
      if (!storagePath) {
        return
      }
      await firebase.storage().ref().child('images/' + storagePath).getDownloadURL().then((url) => {
        document.getElementById(changeImgId).src = url
      })
    },
    async deleteStorageItem (path) {
      if (!path) {
        return
      }
      let storagePath = firebase.storage().ref().child('images/' + path)
      await storagePath.delete().then(function () {
      }).catch(function (error) {
        console.log(error)
      })
    },
    async getTargetData (key) {
      const docSnap = await this.editingRef.doc(key).get()
      if (docSnap.exists) {
        return docSnap.data()
      }
    },
    async deleteItem (ItemId) {
      const target = await this.getTargetData(ItemId)
      const result = window.confirm('削除しますか？')
      if (result) {
        this.deleteStorageItem(target.storagePath)
        if (this.PreviewCell.collection === 'Players') {
          await this.TeamsRef.where('Member', 'array-contains', target.name).get().then(snapShot => {
            snapShot.forEach(doc => {
              this.TeamsRef.doc(doc.id).update({
                Member: firebase.firestore.FieldValue.arrayRemove(target.name)
              })
            })
          })
        } else if (this.PreviewCell.collection === 'Teams') {
          const target = await this.getTargetData(ItemId)
          await this.EventRef.where('ParticipatingTeam', 'array-contains', target.TeamName).get().then(snapShot => {
            snapShot.forEach(doc => {
              this.EventRef.doc(doc.id).update({
                ParticipatingTeam: firebase.firestore.FieldValue.arrayRemove(target.TeamName)
              })
            })
          })
        }
        await this.editingRef.doc(ItemId).delete()
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
      this.TeamMember = []
      this.TeamName = null
      this.EventName = null
      this.ParticipatingTeam = []
      this.EventType = null
      this.isFotoUp = false
      this.nowName = null
      this.storagePath = null
      this.isEditable = false
      this.fotoURL = null
      this.errorMessage = null
      document.getElementById('image').src = null
      this.PreviewCell.name = null
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
        if (this.$route.params.id === doc.id) {
          this.DetailPlayerInfo = doc.data()
        }
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
      const Lobj = {}
      const Cobj = {}
      const Eobj = {}
      querySnapshot.forEach(doc => {
        obj[doc.id] = doc.data()
        if (doc.data().EventType === 'league') {
          Lobj[doc.id] = doc.data()
        } else if (doc.data().EventType === 'cup') {
          Cobj[doc.id] = doc.data()
        } else if (doc.data().EventType === 'clel') {
          Eobj[doc.id] = doc.data()
        }
      })
      this.Event = obj
      this.leagueEvent = Lobj
      this.cupEvent = Cobj
      this.clelEvent = Eobj
      // var key = Object.keys(obj)
      // console.log(key)
    })
    if (this.$route.path.indexOf('PlayerEdit') !== -1) {
      this.PreviewCell.collection = 'Players'
      this.editingRef = this.PlayersRef
    } else if (this.$route.path.indexOf('TeamEdit') !== -1) {
      this.PreviewCell.collection = 'Teams'
      this.editingRef = this.TeamsRef
    } else if (this.$route.path.indexOf('event') !== -1) {
      this.PreviewCell.collection = 'Event'
      this.editingRef = this.EventRef
    }
    window.addEventListener('beforeunload', (e) => {
      if (this.isFotoUp) {
        this.deleteStorageItem(this.newStoragePath)
      }
    })
  },
  beforeDestroy () {
    if (this.isFotoUp) {
      this.deleteStorageItem(this.newStoragePath)
    }
  }
}
