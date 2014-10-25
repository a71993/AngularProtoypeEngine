"use strict";

var express = require('express');
var app = express();
var routers = {};
var NoteRouter = express.Router();
routers.NoteRouter = NoteRouter;

var JsonDataRouter = express.Router();
routers.JsonDataRouter = JsonDataRouter;

var UIComponentRouter = express.Router();
routers.UIComponentRouter = UIComponentRouter;

require('./config.js')(app, express, routers);

require('../note/note_routes.js')(NoteRouter);
require('../jsonData/jsonData_routes.js')(JsonDataRouter);
require('../UIComponent/UIComponent_routes.js')(UIComponentRouter);

module.exports = exports = app;