var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/user');
var Poll = require('../models/poll');


router.get('/poll', function (req, res, next) {
    let id = req.query.id;
    console.log(id);
    // fetch poll and send response
    Poll.findById(req.query.id, (error, poll) => {
        if (error) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(200).json({
            message: 'Success',
            poll
        });
    });

});




router.use('/', function (req, res, next) {

    console.log(req.query.token);

    jwt.verify(req.query.token, process.env.SECRET, function (err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }
        next();
    })
});

router.post('/createpoll', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        var votes = new Array(req.body.options.length).fill(0);

        var poll = new Poll({
            title: req.body.title,
            options: req.body.options,
            votes,
            user: user
        });
        poll.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            user.polls.push(result);
            user.save();
            res.status(201).json({
                message: 'Saved poll',
                poll: result
            });
        });
    });
});



module.exports = router;
