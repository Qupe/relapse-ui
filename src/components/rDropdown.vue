<template>
  <div
    class="r-dropdown"
    v-click-outside="hideDropdown"
  >
    <slot/>
    <div
      class="r-dropdown__caller"
      v-if="hasCallerSlot"
      @click="onCLick">
      <slot name="caller"/>
    </div>
    <div
      class="r-dropdown__content"
      v-if="hasContentSlot"
      :class="{hidden: !visibleComputed}"
    >
      <slot name="content"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'rDropdown',
    props: {
      visible: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        contentVisible: false
      }
    },
    computed: {
      hasCallerSlot () {
        return !!this.$slots.caller
      },
      hasContentSlot () {
        return !!this.$slots.content
      },
      visibleComputed () {
        return !!this.$slots.caller ? this.contentVisible : this.visible
      }
    },
    methods: {
      onCLick (event) {
        this.contentVisible = !this.contentVisible
      },
      hideDropdown () {
        this.$emit('update:visible', this.contentVisible = false)
      }
    }
  }
</script>

<style lang="scss">
  .r-dropdown {
    position: relative;
  }

  .r-dropdown__caller {
    cursor: pointer;
  }

  .r-dropdown__content {
    position: absolute;
    margin: 5px 0;
    padding: 5px;
    -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    border-radius: 4px;
    border: 1px solid #e4e7ed;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background-color: #fff;
    z-index: 10;
    width: 100%;
  }
</style>
