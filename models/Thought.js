const { Schema, model } = require('mongoose');
const ReactionSchema = require('./Reaction');

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: [512, `LESS IS MORE ({VALUE}/512)`]
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: val => `[${val.getDate()}/${val.getMonth()}/${val.getFullYear()}]`
        },
        username: {
            type: String,
            required: [
                true,
                `User is required`
            ]
        },
        reactions: [ ReactionSchema ]
    }, 
    {
        toJSON: {
            virtuals: true,
            getters: true,
            versionKey: false
        }
    }
);
const reactionCount = ThoughtSchema.virtual('reactionCount');
reactionCount.get(function (value, virtual, doc) {
    return (this.reactions) ? this.reactions.length : 0;
});

const Thought = model('Thought', ThoughtSchema);

const test = new Thought(
    {
        username: 'GameGuyBeardMan', 
        thoughtText: 'Ooh ooh I had a thought, wanna know what it schwas?'
    }
);

module.exports = Thought;
