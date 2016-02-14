import Collection from 'ampersand-rest-collection'
import app from 'ampersand-app'
import reduce from 'lodash.reduce'
import moment from 'moment'
import Day from './day'
import authMixin from '../helpers/api-auth-mixin'

export default Collection.extend(authMixin, {

    url () {
      return app.apiUrl + '/api/days';
    },

    model: Day,

    mainIndex: 'date',

    comparator (a,b) {
      if (moment(a.date, 'MM-DD-YYYY').isBefore(moment(b.date, 'MM-DD-YYYY'))) {
        return 1;
      }
      if (moment(a.date, 'MM-DD-YYYY').isAfter(moment(b.date, 'MM-DD-YYYY'))) {
        return -1;
      }
      return 0;
    },

    getSummaryCurrentYear () {
      // const thisYear = new Date().getFullYear();
      const thisYearDays = this.filter(day => {
        return moment(day.date, 'MM-DD-YYYY').year() === moment().year();
      });
      const drinks = reduce(thisYearDays, function (sum, day) {
        return sum + day.drinks;
      }, 0);
      const miles = reduce(thisYearDays, function (sum, day) {
        return sum + day.miles;
      }, 0);
      // const score = (miles - drinks) >= 0 ? '+' + (miles - drinks) : '-' + (miles - drinks);
      return {
        drinks: drinks,
        miles: miles,
        score: miles - drinks
      };
    },

    getScoreForDay (today) {
      const jan1 = moment().dayOfYear(1).subtract(1,'d');
      const previousDays = this.filter(day => {
        return moment(day.date, 'MM-DD-YYYY').isBetween(jan1, moment(today.tomorrow, 'MM-DD-YYYY'), 'd');
      });
      const drinks = reduce(previousDays, function (sum, day) {
        return sum + day.drinks;
      }, 0);
      const miles = reduce(previousDays, function (sum, day) {
        return sum + day.miles;
      }, 0);
      // const score = (miles - drinks) >= 0 ? '+' + (miles - drinks) : '-' + (miles - drinks);
      return {
        drinkSum: drinks,
        mileSum: miles,
        score: miles - drinks
      };
    },

    getLastDays (days) {
      const _this = this;
      let recent;
      if (days) {
        const recent = this.filter((day, i) => {
          return i < days;
        });
      } else {
        recent = this.models;
      }
      return recent.map(day => {
        const d = day.toJSON();
        const extraProps = _this.getScoreForDay(day);
        return Object.assign(d,extraProps);
      });
    },

});
