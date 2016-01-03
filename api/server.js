// Load required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var cors = require('cors');

// Load controllers
var authController = require('./controllers/auth');
var userController = require('./controllers/user');
var dayController = require('./controllers/day');
var yearController = require('./controllers/year');

var port = process.env.PORT || 8080;
var mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/miles-drinks';

// Connect to the ramen-stack MongoDB
mongoose.connect(mongoUri);

console.log('Mongoose connected to ' + mongoUri);

// Create our Express application
var app = express();

app.use(cors());
// Use the body-parser package in our application
// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Use the passport package in our application
app.use(passport.initialize());

// Create our Express router
var router = express.Router();

// Create endpoint handlers for /year
// router.route('/year')
//   .get(authController.isAuthenticated, yearController.getYears);
// router.route('/year/:year')
//   .get(authController.isAuthenticated, yearController.getYear);

router.route('/day/')
  .post(authController.isAuthenticated, dayController.postDay);

// Create endpoint handlers for /day/:date
router.route('/day/:date')
  .get(authController.isAuthenticated, dayController.getDay)
  .put(authController.isAuthenticated, dayController.putDay)
  .delete(authController.isAuthenticated, dayController.deleteDay);

router.route('/days/:year')
  .get(authController.isAuthenticated, dayController.getDaysForYear);

// Create endpoint handlers for /users
router.route('/users')
  .post(userController.postUser)
  .get(authController.isAuthenticated, userController.getUsers);

router.route('/users/:username')
  .get(authController.isAuthenticated, userController.getUser)
  .delete(authController.isAuthenticated, userController.deleteUser);

// Register all our routes with /api
app.use('/api', router);

userController.seedAdmin();

// Start the server
app.listen(port);

console.log('API Started at http://localhost:' + port + '/');
