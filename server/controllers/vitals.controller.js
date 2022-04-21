let Vitals = require('../models/vitals.model');
let Alert = require('../models/alert.model');

module.exports.getVitalsList = (req, res, next) => {
  Vitals.find((err, vitals) => {
    if (err) {
      console.error(err);
      res.end(err);
    } else {
      res.json({
        error: err,
        data: vitals
      });
    }
  }).sort({_id: -1});
};

module.exports.getPatientVitals = (req, res, next) => {
  let patientId = req.params.id
  Vitals.find((err, vitals) => {
    if (err) {
      console.error(err);
      res.end(err);
    } else {
      res.json({
        error: err,
        data: vitals.filter(x => x.patient == patientId)
      });
    }
  }).sort({_id: -1});
};

// Get singular vitals record
module.exports.getVitals = (req, res, next) => {
  let id = req.params.id
  
  Vitals.findById({_id: id}, (err, foundVitals) => {
    if (err) {
      console.error(err);
      res.end(err);
    } else {
      res.json({
        error: err,
        data: foundVitals
      });
    }
  });
};

module.exports.addVitals = (req, res, next) => {
  Vitals.create(req.body, (err, vitals) => {
    if(err) {
      console.error(err);
      res.end(err);
    } else {
      res.json({
        error: err,
        data: vitals,
        msg: "Vitals successfully created."
      });      
    }
  });

}


module.exports.updateVitals = (req, res, next) => {
  let id = req.params.id
  let vitals = Vitals({...req.body, _id: id})

  Vitals.updateOne({_id: id}, vitals, (err) => {
    if (err) {
      console.error(err);
      res.end(err);
    } else {
      res.json({
        error: err,
        msg: "Vitals successfully updated."   
      });
    }
  });
}

module.exports.deleteVitals = (req, res, next) => {
  const id = req.params.id;

  Vitals.remove({_id: id}, (err)=> {
    if (err) {
      console.error(err);
      res.end(err);
    } else {
      res.json({
        error: err,
        msg: "Vitals successfully deleted."
      });
    }
  });
}