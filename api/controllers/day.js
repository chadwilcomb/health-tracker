// Load required packages
var Day = require('../models/day');

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
    day = day.toObject();
    delete day['userId'];
    delete day['__v'];
    delete day['created'];
    res.json(day);
  });

};

// Create endpoint /api/days/:year for GET
exports.getDaysForYear = function(req, res) {

  // Use the Day model to find all days
  Day
    .find({ userId: req.user._id, year: req.params.year })
    .select('-userId -created -__v')
    .exec(function(err, dayReports) {
      if (err)
        res.send(err);

      res.json(dayReports);
    });
};

// Create endpoint /api/days/ for GET
exports.getAllDaysForUser = function(req, res) {

  // Use the Day model to find all days
  Day
    .find({ userId: req.user._id })
    .select('-userId -updated -created -__v')
    .exec(function(err, dayReports) {
      if (err)
        res.send(err);

      res.json(dayReports);
    });
};

// Create endpoint /api/day/:date for GET
exports.getDay = function(req, res) {

  // Use the Day model to find a specific day
  Day
    .findOne({ userId: req.user._id, date: req.params.date })
    .select('-userId -updated -created -__v')
    .exec(function(err, day) {
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
