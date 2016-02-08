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
      if (moment(a.date).isBefore(moment(b.date))) {
        return 1;
      }
      if (moment(a.date).isAfter(moment(b.date))) {
        return -1;
      }
      return 0;
    },

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

    getLastDays (days = 30) {
      return this.take(days);
    },

    getBarChartData () {
      // const labels = [];
      // const thisMonth = moment(new Date()).month();
      // for (let i=0;i<=thisMonth;i++) {
      //   labels.push(moment(new Date()).month(i).format('MMMM'));
      // }
      const labels = this.map((day)=>{
        return day.date;
      })
      const milesData = this.map((day)=>{
        return day.miles;
      });
      const drinksData = this.map((day)=>{
        return day.drinks;
      });
      return {
        labels: labels,
        datasets: [
          {
            label: "Miles",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: milesData
          },
          {
            label: "Drinks",
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,0.8)",
            highlightFill: "rgba(151,187,205,0.75)",
            highlightStroke: "rgba(151,187,205,1)",
            data: drinksData
          }
        ]
      };
    },

});
