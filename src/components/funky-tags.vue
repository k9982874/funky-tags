<template>
    <ul class="funky-tags" :id="id">
        <li v-for="(tag, index) in tags" :key="`item-${index}`">
            <a v-if="is_editable" class="funky-tags-item" :style="randomColor(tag)" href="#" @click="handleOnTagClick($event, tag, index)">{{tag}}</a>
            <a v-else class="funky-tags-item-readonly" :style="randomColor(tag)" href="#">{{tag}}</a>
        </li>
        <li v-if="is_editable">
            <a class="funky-tags-add-item" href="#" @click="handleOnClick">
                <input type="text" v-model="text" v-bind:readonly="readonly" v-bind:ref="id + '-input'" placeholder="Insert..." autofocus @blur="handleOnBlur" @keyup.enter="handleOnEnterKeyup">
            </a>
        </li>
    </ul>
</template>

<script>

  export default {

    computed: {},

    created () {
      this.id = 'tags-' + Date.now()
    },

    data () {
      return {
        id: '',
        text: '',
        readonly: true,
        colors: [
          '#DC143C', '#DB7093', '#FF69B4', '#FF1493', '#C71585', '#DA70D6', '#DDA0DD', '#EE82EE', '#FF00FF', '#8B008B', '#800080', '#BA55D3',
          '#9400D3', '#9932CC', '#4B0082', '#8A2BE2', '#9370DB', '#7B68EE', '#6A5ACD', '#483D8B', '#0000FF', '#0000CD', '#191970', '#00008B',
          '#000080', '#4169E1', '#6495ED', '#778899', '#708090', '#1E90FF', '#4682B4', '#87CEFA', '#87CEEB', '#00BFFF', '#5F9EA0', '#00FFFF',
          '#00FFFF', '#00CED1', '#2F4F4F', '#008B8B', '#008080', '#48D1CC', '#20B2AA', '#40E0D0', '#00FA9A', '#00FF7F', '#3CB371', '#2E8B57',
          '#8FBC8F', '#32CD32', '#00FF00', '#228B22', '#008000', '#006400', '#7FFF00', '#7CFC00', '#556B2F', '#808000', '#BDB76B', '#DAA520',
          '#FFA500', '#D2B48C', '#DEB887', '#FF8C00', '#CD853F', '#F4A460', '#D2691E', '#8B4513', '#A0522D', '#FFA07A', '#FF7F50', '#FF4500',
          '#E9967A', '#FF6347', '#FA8072', '#F08080', '#BC8F8F', '#CD5C5C', '#FF0000', '#A52A2A', '#B22222', '#8B0000', '#800000', '#A9A9A9',
          '#808080', '#696969', '#000000'
        ]
      }
    },

    methods: {
      randomColor: function (tag) {
        if ((typeof tag !== 'string') || (tag.length == 0)) {
          return 'background-color: #0D8DBC'
        }

        let index = tag.charCodeAt(0) % this.colors.length
        return `background-color: ${this.colors[index]}`
      },

      addTag(tag = '') {
        let that = this
        return new Promise((resolve, reject) => {
          if ((typeof tag !== 'string') || (tag.length == 0)) {
            reject(new Error(`Can't add a tag which is empty`))
            return;
          }

          that.tags.push(tag)
          resolve(tag)
        })
      },

      addTagFailed(err) {
        console.log("Call addTagFailed", err)
        this.text = ''
      },

      addTagSuccess() {
        this.text = ''
        this.callSave()

        console.log("Has been added")
      },

      removeTag(index) {
        let that = this
        return new Promise((resolve, reject) => {
          if (index < 0) {
            reject()
          } else {
            that.tags.splice(index, 1)
            resolve()
          }
        })
      },

      removeTagSuccess() {
        this.callSave()
        this.$forceUpdate()
        console.log("Has been removed")
      },

      removeTagFailed(err) {
        console.log("Call remove_tag_failed", err)
      },

      callSave() {
        if (typeof this.on_save == 'function') this.on_save()
      },

      handleOnTagClick(event, tag, index) {
        event.stopPropagation()

        this.removeTag(index)
          .then(this.removeTagSuccess.bind(this))
          .catch(this.removeTagFailed.bind(this))
      },

      handleOnClick(event) {
        if (this.readonly) {
          event.stopPropagation()

          this.readonly = false

          var that = this
          setTimeout(() => {
            that.$refs[that.id + '-input'].focus()
          }, 1)
        }
      },

      handleOnBlur() {
        if (!this.readonly) {
          this.addTag(this.text)
            .then(this.addTagSuccess.bind(this))
            .catch(this.addTagFailed.bind(this))

          this.readonly = true
        }
      },

      handleOnEnterKeyup() {
        if (!this.readonly) {
          this.addTag(this.text)
            .then(this.addTagSuccess.bind(this))
            .catch(this.addTagFailed.bind(this))
        }
      }

    },

    mounted() {
    },

    props: ['tags', 'on_change', 'on_save', 'is_editable']

  }

</script>

<style lang="sass">
  @import '../sass/funky-tags.sass'
</style>