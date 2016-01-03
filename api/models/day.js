// Load required packages
var mongoose = require('mongoose');
var moment = require('moment');

var dateFormatter = function (val) {
  val = moment(val);
  //store date as 'MM-DD-YYYY'
  return val.format('MM-DD-YYYY');
};

var yearFormatter = function (val) {
  // if ('object' != typeof val) val = new Date(val);
  // console.log('Set year: ' + val.getFullYear());
  // return val.getFullYear();
  val = moment(val);
  //store year as 'YYYY'
  return val.format('YYYY');
};

// Define our beer schema
var DaySchema = new mongoose.Schema({
  userId: String,
  // _yearId: { type: mongoose.Schema.Types.ObjectId, ref: 'Year' },
  date: { type: String, set: dateFormatter },
  year: { type: String, set: yearFormatter },
  miles: { type: Number, default: 0 },
  drinks: { type: Number, default: 0 },
  weight: { type: Number },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});

// Export the Mongoose model
module.exports = mongoose.model('Day', DaySchema);
