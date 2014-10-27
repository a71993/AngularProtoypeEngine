"use strict";

var express = require('express');
//var UigProvider = require('./uigprovider-memory').UigProvider;
var app = express();
var routers = {};
var NoteRouter = express.Router();
routers.NoteRouter = NoteRouter;

var JsonDataRouter = express.Router();
routers.JsonDataRouter = JsonDataRouter;

var UIComponentRouter = express.Router();
routers.UIComponentRouter = UIComponentRouter;

var UIGComponentRouter = express.Router();
routers.UIGComponentRouter = UIGComponentRouter;

require('./config.js')(app, express, routers);

require('../note/note_routes.js')(NoteRouter);
require('../jsonData/jsonData_routes.js')(JsonDataRouter);
require('../UIComponent/UIComponent_routes.js')(UIComponentRouter);
require('../UIGComponent/UIGComponent_routes.js')(UIGComponentRouter);
module.exports = exports = app;

//var uigProvider= new UigProvider();



//app.listen(3000);
