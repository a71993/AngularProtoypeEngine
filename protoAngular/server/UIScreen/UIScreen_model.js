"use strict";

var mongoose = require('mongoose');

var UIScreenSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        unique: true

    },
    HTMLcontent: {},
    mainpage: {
        type: Boolean,
        required: false
    },
    Comp:{
        type:Array,
        required:false
        
    }
   

});

module.exports = exports = mongoose.model('uiScreen', UIScreenSchema);