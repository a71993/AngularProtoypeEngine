"use strict";

var express = require('express');
var app = express();
var routers = {};
var NoteRouter = express.Router();
routers.NoteRouter = NoteRouter;

var JsonDataRouter = express.Router();
routers.JsonDataRouter = JsonDataRouter;

require('./config.js')(app, express, routers);

require('../note/note_routes.js')(NoteRouter);
require('../jsonData/jsonData_routes.js')(JsonDataRouter);

module.exports = exports = app;