import Vue from 'vue';
import Form from './components/form/'
import Result from './components/result/'
import style from './style.styl';
import store from './stores/store.js';

setInterval(() => {
  store.currentDate = new Date();
}, 50);

let app = new Vue({
  el: '#content',
  components: {
    'app-form'  : Form,
    'app-result': Result
  }
});
