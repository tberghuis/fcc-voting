var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user');

var schema = new Schema({
    title: { type: String, required: true },
    options: [String],
    votes: [Number],
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});


schema.post('remove', function (poll) {
    User.findById(poll.user, function (err, user) {
        user.polls.pull(poll);
        user.save();
    });
});

module.exports = mongoose.model('Poll', schema);

