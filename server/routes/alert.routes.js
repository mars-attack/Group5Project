const express = require('express');
const router = express.Router();
const AlertController = require('../controllers/alert.controller');
const passport = require('passport');

// GET List of Alerts
router.get('/', passport.authenticate('jwt', {session: false}), AlertController.getAllAlerts);

// GET List of Alerts by patient
router.get('/patient/:id', passport.authenticate('jwt', {session: false}), AlertController.getPatientAlerts);

// GET Alert by alert id
router.get('/:id', passport.authenticate('jwt', {session: false}), AlertController.getAlert);

// PUT update Alert by id 
router.put('/check/:id', passport.authenticate('jwt', {session: false}), AlertController.checkPatient);

// POST add Alert by id 
router.post('/add', passport.authenticate('jwt', {session: false}), AlertController.addAlert);

// DELETE Alert by id 
router.delete('/delete/:id', passport.authenticate('jwt', {session: false}), AlertController.deleteAlert);

module.exports = router;