<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  
    <div>
      <h2>dependencies</h2>
      <funky-tags :tags="dependencies" :is_editable="true"></funky-tags>
    </div>
    <div>
      <h2>devDependencies</h2>
      <funky-tags :tags="devDependencies" :is_editable="false"></funky-tags>
    </div>
  </div>
</template>

<script>

import funkyTags from '@/components/funky-tags'
import data from '../../package.json'

export default {

  name: 'hello',

  computed: {
    dependencies () {
      let ret = []
      for (let key in data.dependencies) {
        ret.push(key)
      }
      return ret
    },

    devDependencies () {
      let ret = []
      for (let key in data.devDependencies) {
        ret.push(key)
      }
      return ret
    }
  },
  
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },

  components: {
    'funky-tags': funkyTags
  }

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

.hello div {
    padding-left: 100px;
    padding-right: 100px;
    margin-top: 100px;
    margin-bottom: 100px;
}
</style>
