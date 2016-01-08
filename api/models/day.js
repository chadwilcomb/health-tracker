// Load required packages
var mongoose = require('mongoose');
var moment = require('moment');

var dateFormatter = function (val) {
  val = moment(val, 'MM-DD-YYYY');
  //store date as 'MM-DD-YYYY'
  return val.format('MM-DD-YYYY');
};

var yearFormatter = function (val) {
  val = moment(val, 'MM-DD-YYYY');
  //store year as 'YYYY'
  return val.format('YYYY');
};

// Define our beer schema
var DaySchema = new mongoose.Schema({
  userId: String,
  date: { type: String, set: dateFormatter },
  year: { type: String, set: yearFormatter },
  miles: { type: Number, default: 0 },
  drinks: { type: Number, default: 0 },
  // weight: { type: Number },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});

//add unique compound index based on userId and date
DaySchema.index({ userId: 1, date: 1 }, { unique: true });

// Export the Mongoose model
module.exports = mongoose.model('Day', DaySchema);
