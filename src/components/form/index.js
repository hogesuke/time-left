import style from './style.styl';
import template from './template.html';
import store from '../../stores/store.js';

export default {
  data: () => {
    return {
      privateState: {
        averageLife: { male: 81, female: 87 },
        gender: 'male'
      },
      sharedState: store
    };
  },
  template: template,
  computed: {
    validation: function () {
      return {
        lifeSpan: /^[0-9]+$/.test(this.sharedState.lifeSpan),
        year    : () => {
          const { year, initAge } = this.sharedState;
          if (!/^[0-9]+$/.test(year)) { return false; }
          return year <= new Date().getFullYear() - initAge;
        },
        month   : /^([1-9]|1[0-2])$/.test(this.sharedState.month),
        day     : /^([1-9]|[1-2][0-9]|3[0-1])$/.test(this.sharedState.day)
      }
    }
  },
  methods: {
    handleGenderClick: function (e) {
      this.sharedState.lifeSpan = this.privateState.averageLife[e.target.value];
    }
  }
};