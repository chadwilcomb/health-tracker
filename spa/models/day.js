import Model from 'ampersand-model';
import app from 'ampersand-app'
import moment from 'moment'
import authMixin from '../helpers/api-auth-mixin';

export default Model.extend(authMixin, {

  isNew () {
    return !this._id;
  },

  methodToURL (method) {
    let url = app.apiUrl + '/api/day/';
    switch (method) {
      // case 'read':
      // case 'update':
      // case 'delete':
      case 'create':
        return url;
      default:
        return url + this.getId();
    };

  },

  sync: function(method, model, options) {
    options = options || {};
    options.url = model.methodToURL(method.toLowerCase());

    return Model.prototype.sync.apply(this, arguments);
  },

  idAttribute: 'date',

  props: {
    _id: 'string',
    date: {
      type: 'string',
      default: moment().format('MM-DD-YYYY')
    },
    miles: {
      type: 'number',
      default: 0
    },
    drinks: {
      type: 'number',
      default: 0
    },
    // weight: 'number',
  },

  derived: {
    yesterday: {
      deps: ['date'],
      fn () {
        return moment(this.date, 'MM-DD-YYYY').subtract(1, 'day').format('MM-DD-YYYY');
      }
    },
    tomorrow: {
      deps: ['date'],
      fn () {
        return moment(this.date, 'MM-DD-YYYY').add(1, 'day').format('MM-DD-YYYY');
      }
    }
  }
});
