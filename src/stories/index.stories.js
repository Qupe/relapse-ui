/* eslint-disable import/no-extraneous-dependencies */
import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import MyButton from '../components/MyButton.vue'
import rInput from '../components/rInput'
import rDropdown from '../components/rDropdown'
import rSuggest from '../components/rSuggest'

import '../styles/helpers.scss'

Vue.config.productionTip = false

Vue.directive('click-outside', {
  bind (el, binding, vNode) {
    el.__vueClickOutside__ = event => {
      if (!el.contains(event.target)) {
        vNode.context[binding.expression](event)
        event.stopPropagation()
      }
    }

    document.body.addEventListener('click', el.__vueClickOutside__)
  },
  unbind (el, binding, vNode) {
    document.removeEventListener('click', el.__vueClickOutside__)
    el.__vueClickOutside__ = null
  }
})

Vue.filter('highlight', (word, query) => {
  let formattedValue = query.split(' ')
  formattedValue = formattedValue[formattedValue.length - 1]
  if (formattedValue !== ' ') {
    let newQuery = formattedValue.replace(/[её]/g, '(е|ё)')
    return word.replace(new RegExp(newQuery, 'g'), '<b>' + formattedValue + '</b>')
  }
})

storiesOf('Button', module)
  .add('with text', () => ({
    components: {MyButton},
    template: '<my-button @click="action">Hello Button</my-button>',
    methods: {action: action('clicked')}
  }))
  /*.add('with JSX', () => ({
    components: { MyButton },
    render () {
      return <my-button onClick={this.action}>With JSX</my-button>
    },
    methods: { action: linkTo('Button', 'with some emoji') }
  }))*/
  .add('with some emoji', () => ({
    components: {MyButton},
    template: '<my-button @click="action">😀 😎 👍 💯</my-button>',
    methods: {action: action('clicked')}
  }))

storiesOf('Input', module).add('default', () => ({
  components: {rInput},
  template: '<r-input/>'
}))

storiesOf('Dropdown', module).add('default', () => ({
  components: {rDropdown},
  template:
    `<r-dropdown class="example">
      <span slot="caller">Dropdown component</span>
      <div slot="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex porro praesentium repudiandae.
       Aliquam consequuntur distinctio exercitationem labore laborum. Amet dolorum, nobis odit quas quidem voluptatem!
       Aliquam blanditiis molestiae obcaecati quia?</div>
    </r-dropdown>`
}))

storiesOf('Suggest', module).add('default', () => ({
  components: {rSuggest},
  template: '<r-suggest input-hint="Suggest component" class="example" />'
}))
