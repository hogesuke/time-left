import Vue from 'vue';
import Form from './components/form/'
import Result from './components/result/'
import style from './style.styl';
import store from './stores/store.js';

setInterval(() => {
  store.currentDate = new Date();
}, 50);

setTimeout(() => {
  let vars = localStorage.getItem('time-left');
  if (vars) {
    vars = JSON.parse(vars);

    store.lifeSpan = vars.lifeSpan;
    store.year     = vars.year;
    store.month    = vars.month;
    store.day      = vars.day;
  }
}, 200);

new Vue({
  el: '#content',
  components: {
    'app-form'  : Form,
    'app-result': Result
  }
});
