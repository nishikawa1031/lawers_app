<template>
  <v-container fluid>
    <v-layout justify-center>
      <div v-if="isWaiting">
        <p>読み込み中</p>
      </div>
      <div v-else>
        <div v-if="!isLogin">
          <v-btn @click="googleLogin">Googleでログイン</v-btn>
        </div>
        <div v-else>
          <p>{{ user.email }}でログイン中</p>
          <v-btn @click="logOut">ログアウト</v-btn>
        </div>
      </div>
      <div v-if="isLogin">
        <label>
          <span>
            お名前:
          </span>
          <input
            type="text"
            v-model="user.name"
          >
        </label>
        <label>
          <span>
            email:
          </span>
          <input
            type="text"
            v-model="user.email"
          >
        </label>
        <v-btn
          @click="submit()"
        >
          Submit
        </v-btn>
        <p>{{ dbData }}</p>

        <v-row align="center">
          <v-col class="d-flex" cols="12" sm="6">
            <v-select
              :items="answer.subject"
              item-text="name"
              item-value="code"
              label="科目"
              dense
            ></v-select>
          </v-col>
          <v-col class="d-flex" cols="12" sm="6">
            <v-select
              :items="answer.year"
              label="年度"
              dense
            ></v-select>
          </v-col>
          <v-btn @click="submitAnswer()">投稿する</v-btn>
        </v-row>
      </div>
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
      answer:{
        year:[2007,2008],
        content:"",
        subject:[{"code":'01',"name":"憲法"},
            {"code":'02',"name":"民法"},
            {"code":'03',"name":"刑法"},
        ],
      },
      dbData: "",
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
         content: this.answer.content
       })
       .then(ref => {
         alert('送信しました')
         console.log('Add ID: ', ref.id)
       })
    },
  }
}
</script>
