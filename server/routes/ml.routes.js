const express = require('express');
const router = express.Router();
const MLController = require('../controllers/ml.controller');
const passport = require('passport');

router.post('/', passport.authenticate('jwt', {session: false}), MLController.predict);

module.exports = router;