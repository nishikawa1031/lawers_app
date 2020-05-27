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
        aaa
        <ul>
          <li v-for="user in users" v-bind:key="user.id">
              {{user.name}}
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
      users:[],
      doc:[]
    }
  },
  mounted() {
    db.collection("users").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        console.log(doc.id, " => ", doc.data());
      });
    });
  }
}


</script>
