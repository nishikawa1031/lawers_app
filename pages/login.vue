<template>
  <v-container fluid>
    <v-layout justify-center>
      <v-row>
        <div v-if="isWaiting">
          <p>読み込み中</p>
        </div>
        <div v-else>
          <div v-if="!isLogin">
            <v-btn @click="googleLogin">Googleでログイン</v-btn>
          </div>
          <div v-else>
            <v-row>
              <p>{{ user.email }}でログイン中</p>
            </v-row>
            <v-row>
              <v-btn @click="logOut">ログアウト</v-btn>
            </v-row>
            <v-row>
              <label>
                <span>
                  お名前:
                </span>
                <input
                  type="text"
                  v-model="user.name"
                >
              </label>
            </v-row>
            <v-row>
              <label>
                <span>
                  email:
                </span>
                <input
                  type="text"
                  v-model="user.email"
                >
              </label>
            </v-row>
            <v-row>
              <v-btn @click="submit()">
                Submit
              </v-btn>
            </v-row>
          </div>
        </div>
      </v-row>
      <v-row>
        <div v-if="isLogin">
            <v-col class="d-flex" cols="12" sm="6">
              <v-select
                v-model="answer.subject"
                item-text="name"
                item-value="code"
                :items="subjects"
                label="科目"
                dense
              ></v-select>
            </v-col>
            <v-col class="d-flex" cols="12" sm="6">
              <v-select
                v-model="answer.year"
                :items="years"
                label="年度"
                dense
              ></v-select>
            </v-col>
            <v-row>
              <label>
                <span>
                  ここにファイルをアップロードしてください
                </span>
                <input
                  type="text"
                  v-model="answer.content"
                >
              </label>
            </v-row>
            <label class="postImage-appendBtn">
              <input @change="upload" type="file" data-label="画像の添付">
            </label>
            <v-row>
              <v-btn @click="submitAnswer()">投稿する</v-btn>
            </v-row>
        </div>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from '@/plugins/firebase'

export default {
  data () {
    return {
      user: {
        name: "",
        email: ""
      },
      subjects:[{"code":'01',"name":"憲法"},
            {"code":'02',"name":"民法"},
            {"code":'03',"name":"刑法"},
      ],
      years:[2007,2008],
      answer:{
        year:"",
        content:"",
        subject:"",
      }
    }
  },
  asyncData() {
    return {
      isWaiting: true,
      isLogin: false,
      user: []
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      this.isWaiting = false
      if (user) {
        this.isLogin = true
        this.user = user
      } else {
        this.isLogin = false
        this.user = []
      }
    })
  },
  methods: {
    googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider)
    },
    logOut() {
      firebase.auth().signOut()
    },
    submit () {
     const db = firebase.firestore()
     let dbUsers = db.collection('users')
     dbUsers
       .add({
         name: this.user.name,
         email: this.user.email,
         created_at: firebase.firestore.FieldValue.serverTimestamp(),
       })
       .then(ref => {
         alert('送信しました')
         console.log('Add ID: ', ref.id)
       })
    },
    submitAnswer () {
     const db = firebase.firestore()
     let dbAnswers = db.collection('answers')
     dbAnswers
       .add({
         subject: this.answer.subject,
         year: this.answer.year,
         content: this.answer.content,
         created_at: firebase.firestore.FieldValue.serverTimestamp(),
       })
       .then(ref => {
         alert('送信しました')
         console.log('Add ID: ', ref.id)
       })
    },
    upload (p) {
        const file = p.target.files[0]
        const storageRef = firebase.storage().ref('users/' + this.id + '/images/' + file.name)
        // 画像をStorageにアップロード
        storageRef.put(file).then(() => {
            // アップロードした画像のURLを取得
            firebase.storage().ref('users/' + this.id + '/images/' + file.name).getDownloadURL().then((url) => {
                // アップロードした画像のURLと画像名をDBに保存
                this.$store.dispatch('user/uploadImage', { id: this.id, name: file.name, url: url })
              alert('保存しました。')
            }).catch((error) => {
                console.log(error)
            })
        })
    }
  }
}
</script>
