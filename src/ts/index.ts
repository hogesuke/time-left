import Vue = require('vue');

var app = new Vue({
  el: '#simple',
  data: {
    message: 'Hello Vue.js',
    font: ''
  },
  methods:{
    magnify: function(){
      this.font = 'font-size:20px;color:red'
    }
  }
});
