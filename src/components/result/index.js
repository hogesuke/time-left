import style from './style.styl';
import template from './template.html';
import store from '../../stores/store.js';

export default {
  data: () => {
    return {
      sharedState: store
    };
  },
  template: template,
  computed: {
    leftPercentage: function () {
      const { lifeSpan, year, month, day, initAge } = this.sharedState;

      if (!(lifeSpan && year && month && day)) {
        return 0;
      }

      const passedPercentage = Math.round((Math.log(this.calcAge() / initAge) / Math.log(lifeSpan / initAge)) * 1000000) / 10000;
      return 100 - passedPercentage;
    }
  },
  methods : {
    calcAge: function () {
      const { year, month, day } = this.sharedState;
      const birthDate = new Date(year, month, day);
      const currentDate = new Date();

      const thisYearBirthday = new Date(currentDate.getFullYear(), month, day);
      const lastYearBirthday = new Date(currentDate.getFullYear() - 1, month, day);
      const isPassedBirthday = thisYearBirthday < currentDate;

      let surplus;
      if (isPassedBirthday) {
        surplus = currentDate.getTime() - thisYearBirthday.getTime();
      } else {
        surplus = currentDate.getTime() - lastYearBirthday.getTime();
      }

      let age = currentDate.getFullYear() - birthDate.getFullYear();
      age = isPassedBirthday ? age : age - 1;

      return age + surplus / (365 * 24 * 60 * 60 * 1000);
    }
  }
};