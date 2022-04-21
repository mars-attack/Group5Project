let Motivation = require('../models/motivation.model');

module.exports.getAllMotivations = (req, res, next) => {
  Motivation.find((err, motivations) => {
    if (err) {
      console.error(err);
      res.end(err);
    } else {
      res.json({
        error: err,
        data: motivations
      });
    }
  }).sort({_id: -1});
};

module.exports.getNurseMotivations = (req, res, next) => {
  let nurseId = req.params.id
  Motivation.find((err, motivations) => {
    if (err) {
      console.error(err);
      res.end(err);
    } else {
      res.json({
        error: err,
        data: motivations.filter(x => x.nurse == nurseId )
      });
    }
  }).sort({_id: -1});
};

module.exports.getMotivation = (req, res, next) => {
  let id = req.params.id
  
  Motivation.findById({_id: id}, (err, foundMotivation) => {
    if (err) {
      console.error(err);
      res.end(err);
    } else {
      res.json({
        error: err,
        data: foundMotivation
      });
    }
  });
};

module.exports.addMotivation = (req, res, next) => {
  Motivation.create(req.body, (err, motivation) => {
    if(err) {
      console.error(err);
      res.end(err);
    } else {
      res.json({
        error: err,
        data: motivation,
        msg: "Motivation successfully created."
      });      
    }
  });
}

module.exports.updateMotivation = (req, res, next) => {
  let id = req.params.id
  let motivation = Motivation({
    "_id": id,
    "nurse": req.body.nurseId,
    "type": req.body.type,
    "contents": req.body.contents,
    "date": Date.now()
  })

  Motivation.updateOne({_id: id}, motivation, (err) => {
    if (err) {
      console.error(err);
      res.end(err);
    } else {
      res.json({
        error: err,
        msg: "Motivation successfully updated."   
      });
    }
  });
}

module.exports.deleteMotivation = (req, res, next) => {
  const id = req.params.id;

  Motivation.remove({_id: id}, (err)=> {
    if (err) {
      console.error(err);
      res.end(err);
    } else {
      res.json({
        error: err,
        msg: "Motivation successfully deleted."
      });
    }
  });
}