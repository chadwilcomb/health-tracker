// Load required packages
var Day = require('../models/day');
// var Year = require('../models/year');

// Create endpoint /api/day for POSTS
exports.postDay = function(req, res) {
  // Create a new instance of the Day model
  var day = new Day();

  // Set the day properties that came from the POST data
  day.userId = req.user._id;
  day.date = req.body.date || new Date();
  day.year = req.body.date || new Date();
  day.miles = req.body.miles;
  day.drinks = req.body.drinks;
  day.weight = req.body.weight;
  day.year = req.body.date;
  // Save the Day and check for errors
  day.save(function(err) {
    if (err) {
      res.send(err);
      return;
    }

    res.json(day);
  });

  // Check to make sure Year exists already, if not insert one
  // Year.findOne({ userId: req.user._id, year: day.date.getFullYear() },
  //   function (err, year) {
  //     if (err)
  //       res.send(err);
  //
  //     // If it doesn't already exist, insert a new Year and add the _yearId to the Day
  //     if (year === null) {
  //       console.log('year doesn\'t exist, creating new Year');
  //       var newYear = new Year({
  //         userId: req.user._id,
  //         year: day.date
  //       });
  //       // newYear.userId = req.user._id;
  //       // newYear.year = day.date;
  //
  //       // Save the Year and check for errors
  //       newYear.save(function (err) {
  //         if (err)
  //           res.send(err);
  //
  //         day._yearId = newYear._id;
  //
  //         // Save the Day and check for errors
  //         day.save(function(err) {
  //           if (err) {
  //             res.send(err);
  //             return;
  //           }
  //
  //           res.json(day);
  //         });
  //
  //       });
  //
  //     // If Year exists, add the _yearId to the Day and save
  //     } else {
  //       console.log('year exists, ' + year.id);
  //       day._yearId = year.id;
  //
  //       // Save the day and check for errors
  //       day.save(function(err) {
  //         if (err)
  //           res.send(err);
  //
  //         res.json(day);
  //       });
  //     }
  //   });


};

// Create endpoint /api/days/:year for GET
exports.getDaysForYear = function(req, res) {

  // Use the Day model to find all days
  Day.find({ userId: req.user._id, year: req.params.year }, function(err, dayReports) {
    if (err)
      res.send(err);

    res.json(dayReports);
  });
};

// Create endpoint /api/day/:date for GET
exports.getDay = function(req, res) {

  // Use the Day model to find a specific day
  Day.findOne({ userId: req.user._id, date: req.params.date }, function(err, day) {
    if (err)
      res.send(err);

    res.json(day);
  });
};

// Create endpoint /api/day/:date for PUT
exports.putDay = function(req, res) {

  // Use the Day model to find a specific day
  Day.findOneAndUpdate(
    { userId: req.user._id, date: req.params.date },
    {
      miles: req.body.miles,
      drinks: req.body.drinks,
      weight: req.body.weight,
      updated: new Date()
    },
    { new: true },
    function(err, day) {
      if (err)
        res.send(err);

    res.json(day);
  });
};

// Create endpoint /api/day/:date for DELETE
exports.deleteDay = function(req, res) {

  // Use the Day model to find a specific day and remove it
  Day.remove({ userId: req.user._id, date: req.params.date }, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Day removed' });
  });
};
