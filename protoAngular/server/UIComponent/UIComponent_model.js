"use strict";

var mongoose = require('mongoose');

var UIComponentSchema = new mongoose.Schema({
  
  title: {
    type: String,
    required: true,
    unique: true
  },
  HTMLcontent: {}
});

module.exports = exports = mongoose.model('uiComponent', UIComponentSchema);