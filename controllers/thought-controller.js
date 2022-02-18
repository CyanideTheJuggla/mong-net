const { Schema, Mongoose } = require('mongoose');
const Thought = require('../models/Thought')

const thoughtController = { 
    getAllThought(req, res) {
        console.log('getAllThought');
        Thought.find({})
        .then(thoughtData => res.status(200).json(thoughtData))
        .catch(err => {
            console.log('err', err);
            res.status(400).json(err);
        })
    },
    getThoughtById({ params }, res) {
        console.log('getThoughtById');
        console.log('params', params);
        Thought.findOne({ _id: params.id })
        .then(thoughtData => thoughtData ? res.status(200).json(thoughtData) : res.status(404).json({ message: 'No thought with this ID' }))
        .catch(err => {
            console.log('err', err);
            res.status(400).json(err);
        });
    },
    getThoughtReactions({ params, body }, res) {
        console.log('putUpdateThought');
        console.log('params', params);
        console.log('body', body);
        const thoughtId = params.id;
        const reactionId = body.reactions[0];
        Thought.findOneAndUpdate({ _id: thoughtId }, body, { new: true })
        .then(thoughtData => {
            if(thoughtData) {
                Thought.findOne({_id: reactionId}).then(reaction => {
                    const reactionsArry = reaction.reactions;
                    reactionsArry.push(thoughtId);
                    Thought.updateOne({_id: reaction.id}, {reactions: reactionsArry})
                })
                //res.status(200).json(thoughtData); 
            } else {
                res.status(404).json({ message: 'No thought with this ID' })
            }
        })
        .catch(err => {
            console.log('err', err);
            res.status(400).json(err);
        });
    },
    postNewThought({ body }, res) {
        console.log('postNewThought');
        console.log('body', body);
        body.child.forEach(element => {
            element.reactionId = new Mongoose.Schema.ObjectId;
        });
        Thought.create(body)
        .then(thoughtData => res.status(200).json(thoughtData))
        .catch(err => {
            console.log('err', err);
            res.status(400).json(err);
        })
    },
    putUpdateThought({ params, body }, res) {
        console.log('putUpdateThought');
        console.log('params', params);
        console.log('body', body);
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then(thoughtData => thoughtData ? res.status(200).json(thoughtData) : res.status(404).json({ message: 'No thought with this ID' }))
        .catch(err => {
            console.log('err', err);
            res.status(400).json(err);
        });
    },
    putAddReaction({ params, body }, res) {
        console.log('putAddReaction');
        console.log('params', params);
        console.log('body', body);
        const thoughtId = params.id;
        const reactionId = body.reactions[0];
        Thought.findOneAndUpdate({ _id: thoughtId }, body, { new: true })
        .then(thoughtData => {
            if(thoughtData) {
                Thought.findOne({_id: reactionId})
                .then(reaction => {
                    reaction.reactions.push(thoughtId);
                    Thought.updateOne({_id: reaction.id}, reaction)
                    .then(reactionData => 
                        reactionData ?
                            res.status(200).json(reactionData) : 
                            res.status(404).json({ message: 'No thought with this ID' }))
                    .catch(err => {
                        console.log('err', err);
                        res.status(400).json(err);
                    })
                })
                //res.status(200).json(thoughtData); 
            } else {
                res.status(404).json({ message: 'No thought with this ID' })
            }
        })
        .catch(err => {
            console.log('err', err);
            res.status(400).json(err);
        });
    },
    deleteThoughtReaction ({ params }, res) {
        console.log('NOT IMPLEMENTED >> deleteThoughtReaction');
        /*
        console.log('params', params);
        Thought.findOneAndDelete({ _id: params.id })
        .then(thoughtData => thoughtData ? res.status(200).json(thoughtData) : res.status(404).json({ message: 'No thought with this ID' }))
        .catch(err => {
            console.log('err', err);
            res.status(400).json(err);
        });*/
    },
    deleteThought ({ params }, res) {
        console.log('deleteThought');
        console.log('params', params);
        Thought.findOneAndDelete({ _id: params.id })
        .then(thoughtData => thoughtData ? res.status(200).json(thoughtData) : res.status(404).json({ message: 'No thought with this ID' }))
        .catch(err => {
            console.log('err', err);
            res.status(400).json(err);
        });
    }
}

module.exports = thoughtController;