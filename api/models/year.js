// Load required packages
var reduce = require('lodash.reduce');
var mongoose = require('mongoose');
var Day = require('./day');

function yearSetter (val) {
  if ('object' != typeof val) val = new Date(val);
  console.log('Set year: ' + val.getFullYear());
  return val.getFullYear();
};

// Define our Year schema
var YearSchema = new mongoose.Schema({
  userId: String,
  year: { type: String, set: yearSetter },
  // miles: { type: Number, default: 0 },
  // drinks: { type: Number, default: 0 },
  // score: { type: Number, default: 0 },
  days: [Day]
});

YearSchema.virtual('miles').get(function () {
  var miles = reduce(this.days, function(total, n) {
    return total + n.miles;
  });
  return miles || 0;
});

YearSchema.virtual('drinks').get(function () {
  var drinks = reduce(this.days, function(total, n) {
    return total + n.drinks;
  });
  return drinks || 0;
});

YearSchema.virtual('score').get(function () {
  return this.miles - this.drinks;
});

// Export the Mongoose model
module.exports = mongoose.model('Year', YearSchema);
