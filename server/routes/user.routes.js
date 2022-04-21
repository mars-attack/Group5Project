const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const jwt = require('jsonwebtoken');
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Route for getting patient list */
router.get('/patients', passport.authenticate('jwt', {session: false}), userController.getPatients);

/* GET Route for getting nurse list */
router.get('/nurses', passport.authenticate('jwt', {session: false}), userController.getNurses);

/* GET User by Id */
router.get('/:id', passport.authenticate('jwt', {session: false}), userController.getUser);

/* POST Route for processing the Login page */
router.post('/login', userController.processLoginPage);

/* POST Route for processing the Register page */
router.post('/register', userController.processRegisterPage);

/* POST Route for updating a studtent */
router.put('/update', passport.authenticate('jwt', {session: false}), userController.processUpdateUser);

/* GET to perform UserLogout */
router.get('/logout', userController.performLogout);

module.exports = router;