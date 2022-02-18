const { Schema, Mongoose } = require('mongoose');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: String,
            default: new Schema.Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: val => `[${val.getDate()}/${val.getMonth()}/${val.getFullYear()}]`
        },
    }
);

module.exports = ReactionSchema;