import Vue from 'vue';
import Form from './components/form/'
import Result from './components/result/'
import style from './style.styl';

let app = new Vue({
  el: '#content',
  components: {
    'app-form'  : Form,
    'app-result': Result
  }
});
