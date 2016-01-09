import Collection from 'ampersand-rest-collection';
import app from 'ampersand-app';
import reduce from 'lodash.reduce'
import Day from './day';
import authMixin from '../helpers/api-auth-mixin';

export default Collection.extend(authMixin, {

    url () {
      return app.apiUrl + '/api/days';
    },

    model: Day,

    mainIndex: 'date',

    getSummaryCurrentYear () {
      const thisYear = new Date().getFullYear();
      const drinks = reduce(this.models, function (sum, day) {
        return sum + day.drinks;
      }, 0);
      const miles = reduce(this.models, function (sum, day) {
        return sum + day.miles;
      }, 0);
      const score = (miles - drinks) >= 0 ? '+' + (miles - drinks) : '-' + (miles - drinks);
      return {
        drinks: drinks,
        miles: miles,
        score: score
      };
    },

});
