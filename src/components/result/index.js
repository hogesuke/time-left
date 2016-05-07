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

      const passedPercentage = (Math.log(this.calcAge() / initAge) / Math.log(lifeSpan / initAge)) * 100;

      if (100 < passedPercentage) {
        return 0;
      }
      return this.padZero(Math.round((100 - passedPercentage) * 1000000000) / 1000000000);
    }
  },
  methods : {
    calcAge: function () {
      const { currentDate, year, month, day } = this.sharedState;
      const birthDate = new Date(year, month, day);

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
    },
    padZero: function (num) {
      return (num + '000000000000').slice(0, 12);
    }
  }
};