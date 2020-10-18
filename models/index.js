const mongoose = require("mongoose");


let postback = new mongoose.Schema({
  tid: {
    type: String
  },
  refid: {
    type: String
  },

  momtransactionid: {
    type: String
  },
  statusid: {
    type: String
  }, 
  statusdesc: {
    type: String
  }, 
  payaccount: {
    type: String
  }
});

module.exports = mongoose.model("Postback", postback);