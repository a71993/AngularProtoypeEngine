"use strict";

var mongoose = require('mongoose');

var UIScreenSchema = new mongoose.Schema({
  
  title: {
    type: String,
    required: true
  },
  HTMLcontent: {}
});

module.exports = exports = mongoose.model('uiScreen', UIScreenSchema);