const mongoose = require("mongoose");


let transaction = new mongoose.Schema({

  status: {
    type: String
  },
  amount: {
    type: String
  }, 
  phoneNumber: {
    type: String
  }, 
  username: {
    type: String
  }
  , 
  socketId: {
    type: String
  }
});



module.exports = mongoose.model("Transaction", transaction);