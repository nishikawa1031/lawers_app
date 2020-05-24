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
        aaa<p>{{ html_data }}</p>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
const axios = require('axios')

const url = 'https://lawanswerapp.firebaseio.com/user.json'

import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  async asyncData() {
    const result = await axios.get(url)
    return { html_data: result.data }
  },
  components: {
    Logo,
    VuetifyLogo
  }
}
</script>
