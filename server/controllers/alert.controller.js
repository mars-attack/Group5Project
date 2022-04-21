const Alert = require("../models/alert.model");

module.exports.getAllAlerts = (req, res, next) => {
  Alert.find((err, alerts) => {
    if (err) {
      console.error(err);
      res.end(err);
    } else {
      res.json({
        error: err,
        data: alerts,
      });
    }
  }).sort({ _id: -1 });
};

module.exports.getPatientAlerts = (req, res, next) => {
  const patientId = req.params.id;
  Alert.find((err, alerts) => {
    if (err) {
      console.error(err);
      res.end(err);
    } else {
      res.json({
        error: err,
        data: alerts.filter((x) => x.patient === patientId),
      });
    }
  }).sort({ _id: -1 });
};

module.exports.getAlert = (req, res, next) => {
  const id = req.params.id;

  Alert.findById({ _id: id }, (err, foundAlert) => {
    if (err) {
      console.error(err);
      res.end(err);
    } else {
      res.json({
        error: err,
        data: foundAlert,
      });
    }
  });
};

module.exports.addAlert = (req, res, next) => {
  const alert = new Alert({ patient: req.body.patient });
  Alert.create(alert, (err, alert) => {
    if (err) {
      console.error(err);
      res.end(err);
    } else {
      res.json({
        error: err,
        data: alert,
        msg: "Alert successfully created.",
      });
    }
  });
};


module.exports.checkPatient = (req, res, next) => {
  const alertId = req.params.id;
  const nurseId = req.body.nurseId;

  Alert.findById({ _id: alertId }, (err, alert) => {
    if (err) {
      console.error(err);
      res.end(err);
    } else {
      alert.checkedBy = nurseId;
      alert.isChecked = true;
      alert.dateChecked =Date.now();
      alert.save();
      res.json({
        success: true,
        msg: "Patient successfully attended to!",
      });
    }
  });
};

module.exports.deleteAlert = (req, res, next) => {
  const id = req.params.id;

  Alert.remove({_id: id}, (err)=> {
    if (err) {
      console.error(err);
      res.end(err);
    } else {
      res.json({
        error: err,
        msg: "Alert successfully deleted."
      });
    }
  });
}
