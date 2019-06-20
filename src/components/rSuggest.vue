<template>
  <div class="r-suggest">
    <r-dropdown
      :visible="dropdownVisible"
      @update:visible="(value) => {this.dropdownVisible = value}">
      <r-input
        :hint="inputHint"
        :value="inputValue"
        @update:value="onInputValueChange"
        @input_focus="onInputFocus"
        @keydown.native.esc.stop.prevent="dropdownVisible = false"
        @keydown.native.tab="dropdownVisible = false"
        @keydown.native.down.stop.prevent="navigateItem('next')"
        @keydown.native.up.stop.prevent="navigateItem('prev')"
        @keydown.native.enter.prevent="itemClick(hoverIndex)"
      />
      <ul
        slot="content"
        class="r-suggest__list">
        <li
          class="r-suggest__item"
          :class="{'c-suggest__item_hover': hoverIndex === index}"
          v-for="(item, index) in data"
          :key="index"
          @click="itemClick(index)"
          v-html="$options.filters.highlight(item.title, inputValue)">
        </li>
      </ul>
    </r-dropdown>
  </div>
</template>

<script>
  import rInput from '../components/rInput'
  import rDropdown from '../components/rDropdown'
  import axios from 'axios'

  const API_URL = 'https://jsonplaceholder.typicode.com/posts/'

  export default {
    name: 'rSuggest',
    components: {
      rInput,
      rDropdown
    },
    props: {
      inputHint: {
        type: String,
        default: ''
      }
    },
    model: {
      event: 'change'
    },
    data () {
      return {
        inputValue: '',
        dropdownVisible: false,
        hoverIndex: -1,
        data: []
      }
    },
    methods: {
      itemClick (index) {
        if (this.data[index]) {
          this.inputValue = this.data[index].city
          this.hoverIndex = index
        }
        this.dropdownVisible = false
      },
      onInputValueChange (value) {
        this.inputValue = value
        this.getData(value).then(() => {
          this.dropdownVisible = !!this.data.length
        })
        this.$emit('change', value)
      },
      async getData (value) {
        if (value) {
          await axios.get(API_URL, {
            params: {
              query: value,
            }
          }).then(response => {
            this.data = response
          }).catch(error => {
            console.error(error)
          })
        } else {
          this.data = []
        }
      },
      onInputFocus (event) {
        this.dropdownVisible = !!this.inputValue
      },
      navigateItem (direction) {
        if (this.data.length === 0) return
        if (!this.dropdownVisible) {
          this.dropdownVisible = false
          return
        }

        if (direction === 'next') {
          this.hoverIndex++
          if (this.hoverIndex === this.data.length) {
            this.hoverIndex = 0
          }
        } else if (direction === 'prev') {
          this.hoverIndex--
          if (this.hoverIndex < 0) {
            this.hoverIndex = this.data.length - 1
          }
        }
      },
    }
  }
</script>

<style lang="scss">
  .r-suggest {
    position: relative;
  }

  .r-suggest__list {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .r-suggest__item {
    cursor: pointer;
    padding: 5px;
    border-radius: 2px;
    color: #333333;
  }

  .r-suggest__item_hover, .r-suggest__item:hover {
    background-color: #f5f3f3;
  }
</style>
