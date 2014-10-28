"use strict";

var mongoose = require('mongoose');

var UIScreenSchema = new mongoose.Schema({
  
  title: {
    type: String,
    required: true
  },
  HTMLcontent: {},
  mainpage:{
      type:Boolean,
      required:false
  }/*screenData:{
    type:

  }*/

});

module.exports = exports = mongoose.model('uiScreen', UIScreenSchema);
