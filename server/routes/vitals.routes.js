const express = require('express');
const router = express.Router();
const VitalsController = require('../controllers/vitals.controller');
const passport = require('passport');

// GET List of Vitals
router.get('/', passport.authenticate('jwt', {session: false}), VitalsController.getVitalsList);
router.get('/patient/:id', passport.authenticate('jwt', {session: false}), VitalsController.getPatientVitals);

// GET Vitals by vitals id
router.get('/:id', passport.authenticate('jwt', {session: false}), VitalsController.getVitals);

//add Vitals
router.post('/add', passport.authenticate('jwt', {session: false}), VitalsController.addVitals);

//update Vitals by id 
router.put('/update/:id', passport.authenticate('jwt', {session: false}), VitalsController.updateVitals);

// delete Vitals by id
router.delete('/delete/:id', passport.authenticate('jwt', {session: false}), VitalsController.deleteVitals);

module.exports = router;