const express = require('express');
const router = express.Router();
const MotivationController = require('../controllers/motivation.controller');
const passport = require('passport');

// GET List of Motivational Tips
router.get('/', passport.authenticate('jwt', {session: false}), MotivationController.getAllMotivations);
router.get('/nurse/:id', passport.authenticate('jwt', {session: false}), MotivationController.getNurseMotivations);

// GET Motivational Tip by motivation id
router.get('/:id', passport.authenticate('jwt', {session: false}), MotivationController.getMotivation);

// POST add Motivational Tip
router.post('/add', passport.authenticate('jwt', {session: false}), MotivationController.addMotivation);

// POST update Motivational Tip by id 
router.put('/update/:id', passport.authenticate('jwt', {session: false}), MotivationController.updateMotivation);

// POST delete Motivational Tip by id
router.delete('/delete/:id', passport.authenticate('jwt', {session: false}), MotivationController.deleteMotivation);

module.exports = router;