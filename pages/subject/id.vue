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
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            v-for="(year, index) in years"
            :key="index"
            text
            @click="yearID(year.id)"
          >
            {{ year.content }}
          </v-btn>
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
        { id:2019, content: '平成31年', created: '2019-03-31 15:30' },
        { id:2018, content: '平成30年', created: '2019-03-31 15:30' },
        { id:2017, content: '平成29年', created: '2019-03-31 15:30' },
        { id:2016, content: '平成28年', created: '2019-03-31 15:30' },
        { id:2015, content: '平成27年', created: '2019-03-31 15:30' },
        { id:2014, content: '平成26年', created: '2019-03-31 15:30' },
        { id:2013, content: '平成25年', created: '2019-03-31 15:30' },
        { id:2012, content: '平成24年', created: '2019-03-31 15:30' },
        { id:2011, content: '平成23年', created: '2019-03-31 15:30' },
        { id:2010, content: '平成22年', created: '2019-03-31 15:30' },
        { id:2009, content: '平成21年', created: '2019-03-31 15:30' },
        { id:2008, content: '平成19年', created: '2019-03-31 15:30' },
        { id:2007, content: '平成18年', created: '2019-03-31 15:30' },
      ]
    }
  },
  methods:{
    yearID(id){
      this.selected = this.route.params.id;
      this.$router.push({path:'/subject/id/' + this.selected + 'year/year_id/',query:{'year_id':year_id}})
    }
  }
}
</script>

