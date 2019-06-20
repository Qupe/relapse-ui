import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

Vue.directive('click-outside', {
  bind(el, binding, vNode) {
    el.__vueClickOutside__ = event => {
      if (!el.contains(event.target)) {
        vNode.context[binding.expression](event)
        event.stopPropagation()
      }
    }

    document.body.addEventListener('click', el.__vueClickOutside__)
  },
  unbind(el, binding, vNode) {
    document.removeEventListener('click', el.__vueClickOutside__)
    el.__vueClickOutside__ = null
  }
})

new Vue({
  render: h => h(App)
}).$mount('#app')
