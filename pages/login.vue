<template>
  <section class="container">
    <div v-if="isWaiting">
      <p>読み込み中</p>
    </div>
    <div v-else>
      <div v-if="!isLogin">
        <button @click="googleLogin">Googleでログイン</button>
      </div>
      <div v-else>
        <p>{{ user.email }}でログイン中</p>
        <v-btn @click="logOut">ログアウト</v-btn>
      </div>
    </div>
    <div class="page">
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
      <button
        type="button"
        @click="submit()"
      >
        Submit
      </button>
      <button
        type="button"
        @click="getData"
      >
        getchData
      </button>
      <p>{{ dbData }}</p>
    </div>
  </section>
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
    getData () {
      const db = firebase.firestore()
      let docUsers = db.collection('users').doc('lxWLuO3uPU7pcpxVhv1d')
      docUsers
        .get()
        .then(function(doc) {
          alert('取得しました')
          document.getElementById("user.id").textContent = (doc.data().name)
        })
      },
    },
}
</script>
