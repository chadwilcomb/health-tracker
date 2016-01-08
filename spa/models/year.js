import Model from 'ampersand-model';
import app from 'ampersand-app'
import authMixin from '../helpers/api-auth-mixin';

export default Model.extend(authMixin, {

  url () {
    let url = app.apiUrl + '/api/year/';
    if (this.isNew()) {
      return url;
    } else {
      return url + this.getId();
    }
    return url;
  },

  idAttribute: '_id',

  props: {
    _id: 'string',
    userId: 'string',
    year: 'number',
    miles: 'number',
    drinks: 'number',
    score: 'number',
  },

  collections: {
    days: DayCollection
  },

  fetch () {
    Model.prototype.fetch.apply(this, arguments);
  }
});
