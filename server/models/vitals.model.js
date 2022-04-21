const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a alert class
const vitalsModel = Schema({
  patient: {
    type: Schema.ObjectId,
    ref: 'User' // User with userType as 'patient'
  },
  date: 
  {
    type: Date,
    default: Date.now
  },
  age:  Number,
  sex: Number, // (1 = male; 0 = female)
  cp: Number, // chest pain type
  trestbps: Number, // The person’s resting blood pressure
  chol: Number, // The person’s cholesterol measurement in mg/dl
  fbs: Number, // (fasting blood sugar > 120 mg/dl)  (1 = true; 0 = false)
  thalach: Number, // The person’s maximum heart rate achieved
  exang: Number // Exercise induced angina (1 = yes; 0 = no)

  // Chest Pain Types
  // -- Value 1: typical angina
  // -- Value 2: atypical angina
  // -- Value 3: non-anginal pain
  // -- Value 4: asymptomatic
},
{
  collection: "vitals"
});

module.exports = mongoose.model('Vitals', vitalsModel);