"use strict";

var mongoose = require('mongoose');

var UIGComponentSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },
  HTMLcontent: {},
  controller: {}
});

module.exports = exports = mongoose.model('uigComponent', UIGComponentSchema);
