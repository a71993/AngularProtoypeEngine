"use strict";

var controller = require('./jsonData_controllers.js');

module.exports = exports = function (router) {
  router.route('/')
    .get(controller.get)
    .post(controller.post);
};
