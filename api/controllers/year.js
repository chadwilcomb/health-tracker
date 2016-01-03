// Load required packages
// var reduce = require('lodash.reduce');
var Year = require('../models/year');
var Day = require('../models/day');


// Create endpoint /api/year/:year for GET
exports.getYear = function(req, res) {
  console.log('get Year: ' + req.params.year);
  Year
    .findOne({ userId: req.user._id, year: req.params.year })
    .exec(function (err, year) {
      if (err) {
        res.send(err);
        return;
      }
      if (year === null) {
        console.log('no year found for ' + req.params.year);
        res.send({});
        return;
      }
      Day.find({ userId: req.user._id, _yearId: year._id })
        .exec(function (err, days) {
          if (err) {
            res.send(err);
            return;
          }
          if (days === null) {
            console.log('no days found');
            res.json(year);
            return;
          }
          console.log('days found: ' + days.length);

          year.days = days;

          // year.miles = reduce(year.days, function(total, n) {
          //   return total + n.miles;
          // });
          //
          // year.drinks = reduce(year.days, function(total, n) {
          //   return total + n.drinks;
          // });
          //
          // year.score = year.miles - year.drinks;
          console.log(year.toObject({ virtuals: true }));
          res.json(year.toObject({ virtuals: true }));

        });

    });
};

// Create endpoint /api/year for GET
exports.getYears = function (req, res) {

  Year.find({ userId: req.user._id })
    .populate('days')
    .exec(function (err, years) {
      if (err)
        res.send(err);

      res.json(years);
    });
};
