"use strict";

var JsonData = require('./jsonData_model.js');

module.exports = exports = function (router) {

  router.param('jsonData', function(req, res, next, id) {
    var query = JsonData.findById(id);
  
    query.exec(function (err, jsonData){
      if (err) { return next(err); }
      if (!jsonData) { return next(new Error("can't find json data")); }
      
      req.jsonData = jsonData;
      return next();
    });
  });
  
  router.get('/', function(req, res, next) {
    JsonData.find(function(err, jsonData){
      if(err){ return next(err); }
  
      res.json(jsonData);
    });
  });
  
  router.post('/', function(req, res, next) {
    var jsonData = new JsonData(req.body);
  
    jsonData.save(function(err, jsonData){
      if(err){ return next(err); }
  
      res.json(jsonData);
    });
  });
    
  router.get('/:jsonData', function(req, res) {
    res.json(req.jsonData);
  });
  
  router.delete('/:jsonData', function(req, res, next) {
    JsonData.remove(req.jsonData ,function(err, jsonData){
      if(err){ return next(err); }
      res.json({ message: 'Successfully deleted' });
    });
  });
  
  router.put('/:jsonData', function(req, res, next) {
    req.jsonData.title = req.body.title;
    req.jsonData.content = req.body.content;
    req.jsonData.save(function(err, jsonData){
      if(err){ return next(err); }
      res.json({ message: 'Successfully updated' });
    });
  });
};
