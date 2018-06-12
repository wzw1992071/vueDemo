import Vue from 'vue'

Vue.filter('capitalize', function (value) {
    if (!value) return ''
    value = value.toString()
    return 3
  })
  