var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/user');
var Poll = require('../models/poll');

var ObjectId = require('mongoose').Types.ObjectId;


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


router.get('/allpolls', function (req, res, next) {

    Poll.find({}).select('title').exec((error, polls) => {

        res.status(200).json({
            message: 'Success',
            polls
        });

    });

});





// hey this is really bad rest api design.
// will do better next time

// req.body = { index, newOption }
router.post('/pollvoteanon/:pollId', function (req, res) {

    Poll.findById(req.params.pollId, (error, poll) => {
        if (error) {
            return res.status(500).json({
                title: 'An error occurred',
                error
            });
        }
        // check if ip voted
        var ip = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
        if (poll.ipsVoted.indexOf(ip) > -1) {
            return res.status(412).json({
                title: 'User at IP '+ip+' has already voted on this poll'
            });
        }
        // push ip to ipsVoted [] and markModified
        poll.ipsVoted.push(ip);
        poll.markModified("ipsVoted");

        if (req.body.newOption) {
            poll.options.push(req.body.newOption);
            poll.votes.push(1);

        }
        else {

            poll.votes[req.body.index]++;
            // this was a lesson
            poll.markModified("votes");
        }

        poll.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(201).json({
                message: 'voted on poll',
                poll: result
            });
        });

    });

});














router.use('/', function (req, res, next) {

    jwt.verify(req.query.token, process.env.SECRET, function (err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }

        console.log("do i pass through middleware");
        next();
    })
});


router.get('/mypolls', function (req, res, next) {

    // auth middleware should get the userid ...
    let userId = jwt.decode(req.query.token).user._id;

    Poll.find({ owner: new ObjectId(userId) }).select('title').exec((error, polls) => {
        console.log("do i get to mypolls");
        if (error) {
            return res.status(500).json({
                title: 'An error occurred',
                error
            });
        }

        res.status(200).json({
            message: 'Success',
            polls
        });

    });

});

router.post('/pollvote', function (req, res, next) {
    let pollId = req.query.id;
    console.log(pollId);
    let userId = jwt.decode(req.query.token).user._id;

    console.log("do i get here");


    Poll.findById(pollId, (error, poll) => {
        if (error) {
            return res.status(500).json({
                title: 'An error occurred',
                error
            });
        }
        if (poll.usersVoted.indexOf(userId) > -1) {
            return res.status(412).json({
                title: 'User has already voted on this poll'
            });
        }

        poll.usersVoted.push(userId);
        poll.markModified("usersVoted");

        if (req.body.newOption) {
            poll.options.push(req.body.newOption);
            poll.votes.push(1);

        }
        else {
            // what to do if index undefined... throw an error
            // can i use try catch???
            // such a noob
            poll.votes[req.body.index]++;
            // this was a lesson
            poll.markModified("votes");
        }

        poll.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(201).json({
                message: 'voted on poll',
                poll: result
            });
        });

    });

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
            owner: user
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


router.delete('/poll/:pollId', function (req, res) {
    var userId = jwt.decode(req.query.token).user._id;
    // TODO test that userid is owner of poll
    Poll.remove({
        _id: req.params.pollId
    }, function (err) {
        if (err)
            res.send(err);
        res.status(204).json({ message: 'Successfully deleted' });
    });
});

module.exports = router;
