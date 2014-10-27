"use strict";

var UIGComponent = require('./UIGComponent_model.js');

module.exports = exports = function (router) {

  router.param('uigComponent', function(req, res, next, id) {
    var query = UIGComponent.findById(id);
  
    query.exec(function (err, uigComponent){
      if (err) { return next(err); }
      if (!uigComponent) { return next(new Error("can't find component")); }
      
      console.log(req.body);
  
      req.uigComponent = uigComponent;
      return next();
    });
  });
  
  router.get('/', function(req, res, next) {
    UIGComponent.find(function(err, uigComponent){
      if(err){ return next(err); }
  
      res.json(uigComponent);
    });
  });
  
    
  router.get('/:uigComponent', function(req, res) {
    res.json(req.uigComponent);
  });
    
      router.delete('/:uigComponent', function(req, res, next) {
    UIGComponent.remove(req.uigComponent ,function(err, uigComponent){
      if(err){ return next(err); }
      res.json({ message: 'Successfully deleted' });
    });
  });
  
  router.put('/:uigComponent', function(req, res, next) {
    console.log(req.uigComponent);
    req.uigComponent = req.body;    
    console.log(req.body);
    var uigComponent = new UIGComponent(req.uigComponent);
    // uiComponent.save(function(err, jsonData){
    //   if(err){ return next(err); }
    //   res.json({ message: 'Successfully updated' });
    // });
  });
};
  