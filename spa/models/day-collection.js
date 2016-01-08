import Collection from 'ampersand-rest-collection';
import app from 'ampersand-app';
import Day from './day';
import authMixin from '../helpers/api-auth-mixin';

export default Collection.extend(authMixin, {

    url () {
      return app.apiUrl + '/api/days';
    },

    model: Day,

    mainIndex: 'date',

});
