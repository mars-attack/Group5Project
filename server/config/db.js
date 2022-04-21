const mongoose = require('mongoose');
const config = require("./config");

module.exports = function () {
    // point mongoose to the db URI
    mongoose.connect(config.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    } ); // connects to MongoDB Atlas
    
    // configuring connection listeners
    let mongoDB = mongoose.connection;
    mongoDB.on('error', console.error.bind(console, 'Connection Error: ')); // if there is a connection error, this will send an error message to the console
    mongoDB.once('open', ()=> {
      console.log('Connected to MongoDB...');
    });


    return mongoDB;

}