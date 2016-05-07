import Vue from 'vue';
import Form from './components/form/'
import style from './style.styl';

let app = new Vue({
  el: '#content',
  components: {
    'app-form': Form
  }
});
