"use strict";

var JsonData = require('./jsonData_model.js'),
    Q        = require('q');

module.exports = exports = {
  get: function (req, res, next) {
    var $promise = Q.nbind(JsonData.find, JsonData);
    $promise()
      .then(function (jsonData) {
        res.json(jsonData);
      })
       .fail(function (reason) {
        next(reason);
      });
  },

  post: function (req, res, next) {
    var jsonData = new JsonData(req.body);
    var $promise = Q.nbind(JsonData.create, JsonData);
    $promise(jsonData)
      .then(function (id) {
        res.send(id);
      })
      .fail(function (reason) {
        next(reason);
      });
  },
  
  put: function(req, res, next){
      
  },
  
  delete: function(req, res, next){
      
  }
};