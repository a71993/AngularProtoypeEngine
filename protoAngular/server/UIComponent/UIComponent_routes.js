"use strict";

var UIComponent = require('./UIComponent_model.js');

module.exports = exports = function (router) {

  router.param('uiComponent', function(req, res, next, id) {
    var query = UIComponent.findById(id);
  
    query.exec(function (err, uiComponent){
      if (err) { return next(err); }
      if (!uiComponent) { return next(new Error("can't find component")); }
      
      console.log(req.body);
  
      req.uiComponent = uiComponent;
      return next();
    });
  });
  
  router.get('/', function(req, res, next) {
    UIComponent.find(function(err, uiComponent){
      if(err){ return next(err); }
  
      res.json(uiComponent);
    });
  });
  
  router.post('/', function(req, res, next) {
    var uiComponent = new UIComponent(req.body);
    console.log(uiComponent);
  
    uiComponent.save(function(err, uiComponent){
      if(err){ return next(err); }
  
      res.json(uiComponent);
    });
  });
    
  router.get('/:uiComponent', function(req, res) {
    res.json(req.uiComponent);
  });
  
  router.delete('/:uiComponent', function(req, res, next) {
    UIComponent.remove(req.uiComponent ,function(err, uiComponent){
      if(err){ return next(err); }
      res.json({ message: 'Successfully deleted' });
    });
  });
  
  router.put('/:uiComponent', function(req, res, next) {
    req.uiComponent.title = req.body.title;
    req.uiComponent.content = req.body.content;
    req.uiComponent.save(function(err, uiComponent){
      if(err){return next(err); }
      res.json({ message: 'Successfully updated'});
    });
  });
  
};
