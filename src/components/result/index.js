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
    passedPercentage: function () {
      const { lifeSpan, year, month, day, initAge } = this.sharedState;

      if (!(lifeSpan && year && month && day && initAge)) {
        return null;
      }

      this.save();

      const passedPercentage = (Math.log(this.calcAge() / initAge) / Math.log(lifeSpan / initAge)) * 100;

      if (100 < passedPercentage) {
        return 100;
      }
      if (passedPercentage < 0) {
        return 0;
      }
      return this.padZero(Math.round(passedPercentage * 1000000000) / 1000000000);
    },
    centerAge: function () {
      const { lifeSpan, initAge } = this.sharedState;

      if (!(lifeSpan && initAge)) {
        return 0;
      }

      return Math.round(Math.sqrt(initAge * lifeSpan) * 10) / 10;
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
    },
    save: function () {
      const { lifeSpan, year, month, day } = this.sharedState;
      localStorage.setItem('time-left', JSON.stringify({ lifeSpan: lifeSpan, year: year, month: month, day: day }));
    }
  }
};