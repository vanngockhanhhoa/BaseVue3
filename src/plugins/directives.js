import Cleave from 'cleave.js'

export default {
  install: (app) => {
    app.directive('cleave', {
      created: (el, binding) => {
        el.cleave = new Cleave(el, binding.value || {})
      },
    })
  },
}
