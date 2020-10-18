const mongoose = require('mongoose');
require('dotenv/config');

const mongoDB = process.env.MONGO_DB;


const connectToMongoDB = async () => {
  try {
    await mongoose.connect(mongoDB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log('Successfully connected to MongoBD ....');
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectToMongoDB;