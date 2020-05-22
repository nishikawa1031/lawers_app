<template>
  <v-app dark>
    <v-app-bar app>
      <v-btn text to="/"><v-toolbar-title v-text="title" /></v-btn>
      <v-btn
        v-for="(subject, index) in subjects"
        :key="index"
        text
        @click="subjectID(subject.id)"
      >
        {{ subject.content }}
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      :fixed="fixed"
      app
    >
    <v-btn text>contact</v-btn>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      subjects: [
        { id:0, content: '憲法', created: '2019-03-31 15:30' },
        { id:1, content: '民法', created: '2019-03-31 15:30' },
        { id:2, content: '刑法', created: '2019-03-31 15:30' },
        { id:3, content: '民訴', created: '2019-03-31 15:30' },
        { id:4, content: '刑訴', created: '2019-03-31 15:30' },
        { id:5, content: '行政法', created: '2019-03-31 15:30' },
        { id:6, content: '商法', created: '2019-03-31 15:30' },
        { id:7, content: '労働法', created: '2019-03-31 15:30' },
        { id:8, content: '知財', created: '2019-03-31 15:30' },
        { id:9, content: '倒産', created: '2019-03-31 15:30' },
        { id:10, content: '租税', created: '2019-03-31 15:30' },
        { id:11, content: '環境法', created: '2019-03-31 15:30' },
        { id:12, content: '国際関係法', created: '2019-03-31 15:30' },
      ],
      title: '司法試験答案集'
    }
  },
  methods:{
    subjectID(id){
      this.$router.push({path:'/subject/id/',query:{'id':id}})
    }
  }
}
</script>
