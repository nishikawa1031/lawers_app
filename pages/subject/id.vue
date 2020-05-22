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
      <v-card>
        <v-card-title class="headline">
          年度を選択してください。
        </v-card-title>
        <v-card-text>
          <v-btn
            v-for="(year, index) in years"
            :key="index"
            text
            @click="yearID(year.id)"
          >
            {{ year.content }}
          </v-btn>
        </v-card-text>
        <v-card-actions>
          <v-spacer />

        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      years: [
        { id:2019, content: 'H31(2019)', created: '2019-03-31 15:30' },
        { id:2018, content: 'H30(2018)', created: '2019-03-31 15:30' },
        { id:2017, content: 'H29(2017)', created: '2019-03-31 15:30' },
        { id:2016, content: 'H28(2016)', created: '2019-03-31 15:30' },
        { id:2015, content: 'H27(2015)', created: '2019-03-31 15:30' },
        { id:2014, content: 'H26(2014)', created: '2019-03-31 15:30' },
        { id:2013, content: 'H25(2013)', created: '2019-03-31 15:30' },
        { id:2012, content: 'H24(2012)', created: '2019-03-31 15:30' },
        { id:2011, content: 'H23(2011)', created: '2019-03-31 15:30' },
        { id:2010, content: 'H22(2010)', created: '2019-03-31 15:30' },
        { id:2009, content: 'H21(2009)', created: '2019-03-31 15:30' },
        { id:2008, content: 'H20(2008)', created: '2019-03-31 15:30' },
        { id:2007, content: 'H19(2007)', created: '2019-03-31 15:30' },
      ]
    }
  },
  methods:{
    yearID(year_id){
      this.selected = this.route.params.id;
      this.$router.push({path:'/subject/id/' + this.selected + 'year/year_id/',query:{'year_id':year_id}})
    }
  }
}
</script>

