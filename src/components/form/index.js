import style from './style.styl';
import template from './template.html';

export default {
  data: () => {
    return {
      averageLife: {
        male: 81, female: 87
      },
      gender  : 'male',
      lifeSpan: 81,
      year    : null,
      month   : 0,
      day     : 0
    };
  },
  template: template,
  computed: {
    validation: function () {
      return {
        lifeSpan: /^[0-9]+$/.test(this.lifeSpan),
        year    : /^[1,2][0-9]{3}$/.test(this.year),
        month   : /^([1-9]|1[0-2])$/.test(this.month),
        day     : /^([1-9]|[1-2][0-9]|3[0-1])$/.test(this.day)
      }
    }
  },
  methods: {
    handleGenderClick: function (e) {
      this.lifeSpan = this.averageLife[e.target.value];
    }
  }
};