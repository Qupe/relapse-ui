<template>
  <label class="r-input">
    <input
      class="r-input__field"
      :placeholder="hint"
      :value="inputValueComputed"
      @input="onInput"
      @focus="onFocus"
    />
    <span
      class="r-input__clear"
      :class="{hidden: !buttonClearVisible}"
      @click="onClear">
      &times;
    </span>
  </label>
</template>

<script>
export default {
  name: 'rInput',
  props: {
    value: {
      type: String,
      default: ''
    },
    hint: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      inputValue: ''
    }
  },
  computed: {
    buttonClearVisible () {
      return !!this.inputValue
    },
    inputValueComputed () {
      return this.value || this.inputValue
    }
  },
  methods: {
    onInput (event) {
      this.$emit('update:value', event.target.value)
      this.inputValue = event.target.value
    },
    onClear () {
      this.$emit('update:value', '')
      this.inputValue = ''
    },
    onFocus (event) {
      this.$emit('input_focus', event)
    }
  }
}
</script>

<style lang="scss">
  .r-input {
    position: relative;
    display: block;
  }

  .r-input .r-input__field {
    background-color: #f5f3f3;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    width: 100%;
  }

  .r-input .r-input__field:focus {
    outline: none;
    border-color: #409eff;
    background-color: #fff;
  }

  .r-input .r-input__clear {
    position: absolute;
    top: 7px;
    right: 12px;
    cursor: pointer;
    padding: 3px;
  }
</style>
