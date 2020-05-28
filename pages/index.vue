<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <div class="text-center">
        {{ allAnswers }}
        <ul>
          <li v-for="user in allData" v-bind:key="user.id">
            <v-card>{{user.name}}</v-card>

          </li>
        </ul>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import firebase from '@/plugins/firebase'

const db = firebase.firestore()


export default {
  data () {
    return {
      allData: [],
      allAnswers:[]
    }
  },
  created() {
    allusers: {
        firebase.firestore().collection('users').get().then(snapshot => {
          snapshot.forEach(doc => {
            this.allData.push(doc.data())
          })
        })
      }
    allanswers: {
        firebase.firestore().collection('answers').get().then(snapshot => {
          snapshot.forEach(doc => {
            this.allAnswers.push(doc.data())
          })
        })
      }
  },
  mounted() {
  }
}


</script>
