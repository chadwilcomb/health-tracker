// Load required packages
var Record = require('../models/record');

// Create endpoint /api/records for POSTS
exports.postRecord = function(req, res) {
  // Create a new instance of the Record model
  var record = new Record();

  // Set the record properties that came from the POST data
  record.type = req.body.type || 'unknown';
  record.sessionId = req.body.sessionId;
  record.date = req.body.date || Date.now;
  record.userId = req.user._id;

  // Save the record and check for errors
  record.save(function(err) {
    if (err)
      res.send(err);

    res.json(record);
  });
};

// Create endpoint /api/records for GET
exports.getRecords = function(req, res) {

  // Use the Record model to find all records
  Record.find({ userId: req.user._id }, function(err, records) {
    if (err)
      res.send(err);

    res.json(records);
  });
};

// Create endpoint /api/records/:record_id for GET
exports.getRecord = function(req, res) {

  // Use the Record model to find a specific record
  Record.findOne({ userId: req.user._id, _id: req.params.record_id }, function(err, record) {
    if (err)
      res.send(err);

    res.json(record);
  });
};

// Create endpoint /api/records/:record_id for PUT
exports.putRecord = function(req, res) {

  // Use the Record model to find a specific record
  Record.findOneAndUpdate(
    { userId: req.user._id, _id: req.params.record_id },
    {
      type: req.body.type,
      date: req.body.date,
      sessionId: req.body.sessionId,
    },
    { new: true },
    function(err, record) {
      if (err)
        res.send(err);

      res.json(record);
  });
};

// Create endpoint /api/records/:record_id for DELETE
exports.deleteRecord = function(req, res) {

  // Use the Record model to find a specific record and remove it
  Record.remove({ userId: req.user._id, _id: req.params.record_id }, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Record removed' });
  });
};
