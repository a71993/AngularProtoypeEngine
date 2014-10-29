"use strict";

var UIScreen = require('./UIScreen_model.js');

module.exports = exports = function (router) {

    router.param('uiScreen', function (req, res, next, id) {
        var query = UIScreen.findById(id);

        query.exec(function (err, uiScreen) {
            if (err) {
                return next(err);
            }
            if (!uiScreen) {
                return next(new Error("can't find screen"));
            }

            console.log(req.body);

            req.uiScreen = uiScreen;
            return next();
        });
    });

    router.get('/', function (req, res, next) {
        UIScreen.find(function (err, uiScreen) {
            if (err) {
                return next(err);
            }

            res.json(uiScreen);
        });
    });

    router.post('/', function (req, res, next) {
        var uiScreen = new UIScreen(req.body);
        console.log(uiScreen);

        uiScreen.save(function (err, uiScreen) {
            if (err) {
                return next(err);
            }

            res.json(uiScreen);
        });
    });

    router.get('/:uiScreen', function (req, res) {
        res.json(req.uiScreen);
    });

    router.delete('/:uiScreen', function (req, res, next) {
        UIScreen.remove(req.uiScreen, function (err, uiScreen) {
            if (err) {
                return next(err);
            }
            res.json({
                message: 'Successfully deleted'
            });
        });
    });

    router.put('/:uiScreen', function (req, res, next) {
        console.log('updating');
        req.uiScreen.title = req.body.title;
        req.uiScreen.content = req.body.content;
        req.UIScreen.mainpage=req.body.mainpage;
        req.uiScreen.save(function (err, uiScreen) {
            if (err) {
                return next(err);
            }
            res.json({
                message: 'Successfully updated'
            });
        });
    });