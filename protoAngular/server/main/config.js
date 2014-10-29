"use strict";

var mongoose    = require('mongoose'),
    morgan      = require('morgan'),
    bodyParser  = require('body-parser'),
    methodOverride = require('method-override'),
    middle      = require('./middleware');

mongoose.connect(process.env.DB_URL || 'mongodb://localhost/AngularProtoypeEngine');
/*
 * Include all your global env variables here.
*/
module.exports = exports = function (app, express, routers) {
  app.set('port', process.env.PORT || 8080);
  app.set('base url', process.env.URL || 'http://localhost');
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(methodOverride());
  app.use(middle.cors);
  app.use(express.static(__dirname + '/../../client'));
  app.use('/note', routers.NoteRouter);
  app.use('/jsonData', routers.JsonDataRouter);
  app.use('/uiComponent', routers.UIComponentRouter);
  app.use('/uigComponent', routers.UIGComponentRouter);
  app.use('/uiScreen', routers.UIScreenRouter);
  app.use(middle.logError);
  app.use(middle.handleError);
};
