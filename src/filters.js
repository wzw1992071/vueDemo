import Vue from 'vue'

Vue.filter('capitalize', function (value) {
    if (!value) return ''
    
    return value/10
  })
  