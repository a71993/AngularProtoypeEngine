"use strict";

var mongoose = require('mongoose');

var JsonDataSchema = new mongoose.Schema({
  
  title: {
    type: String,
    required: true
  },
  content: {}
});

module.exports = exports = mongoose.model('jsonData', JsonDataSchema);