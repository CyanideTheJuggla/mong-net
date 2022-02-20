const { Schema, Mongoose } = require('mongoose');
const Thought = require('../models/Thought');
const User = require('../models/User');

const thoughtController = { 
    getAllThought(req, res) {
        console.log('getAllThought');
        console.log('GET /api/thought');
        Thought.find({})
        .then(thoughtData => res.status(200).json(thoughtData))
        .catch(err => {
            console.log('err', err);
            res.status(400).json(err);
        })
    },
    getThoughtById({ params }, res) {
        console.log('getThoughtById');
        console.log('GET /api/thought/:id');
        console.log('params', params);
        Thought.findOne({ _id: params.id })
        .then(thoughtData => thoughtData ? res.status(200).json(thoughtData) : res.status(404).json({ message: 'No thought with this ID' }))
        .catch(err => {
            console.log('err', err);
            res.status(400).json(err);
        });
    },
    getThoughtReactions({ params }, res) {
        console.log('getThoughtReactions');
        console.log('params', params);
        const thoughtId = params.id;
        try {
            Thought.findOne({ _id: thoughtId })
            .then(thoughtData => {
                if(thoughtData) {
                    if (thoughtData.reactions) {
                        res.status(200).json(thoughtData.reactions);
                    } 
                    else {
                        res.status(200).json({ message: "This thought has no reactions" });
                    }
                    
                } else {
                    res.status(404).json({ message: 'No thought with this ID' })
                }
            });
        } catch (err) {
            console.log('err', err);
            res.status(400).json(err);
        }
    },
    postNewThought({ body }, res) {
        console.log('\npostNewThought\n');
        try {
            Thought.create(body)
            .then(thoughtData => {
                if(thoughtData) {
                    console.log('\nthoughtData', thoughtData);
                    console.log('\nthought created\n');
                    console.log(thoughtData.username);
                    User.findOne({ username: thoughtData.username})
                    .then(userData => {
                        if (userData) {
                            console.log(userData);
                            console.log('\nuser found\n');
                            userData.thoughts.push(thoughtData.id);
                            console.log('\nsaving thought to user arry\n');
                            userData.save()
                            .then(userDataNew => userDataNew ? res.status(200).json(userDataNew) : res.status(404).json({message: "not found"}) );
                        } else {
                            res.status(404).json({message: "not found"})
                        }
                    })
                } else {
                    res.status(404).json({message: "failed to post thought"})
                }
                
            });

        } catch (err) {
            console.log('\n\nerr', err);
            console.log('\n\n');
            res.status(400).json(err);
        }
    },
    putUpdateThought({ params, body }, res) {
        console.log('putUpdateThought');
        console.log('params', params);
        console.log('body', body);

        try {
            Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(thoughtData => 
                thoughtData ? 
                res.status(200).json(thoughtData) : 
                res.status(404).json({ message: 'No thought with this ID' })
            );
        } catch (err) {
            console.log('err', err);
            res.status(400).json(err);
        }
        
    },
    putAddReaction({ params, body }, res) {
        console.log('putAddReaction');
        //console.log('params', params);
        console.log('body', body);
        const thoughtId = params.id;
        try {
            Thought.findOne({_id: thoughtId})
            .then(thoughtData => {
                if (thoughtData){
                    thoughtData.reactions.push(body);
                    thoughtData.save()
                    .then(thought => {
                        res.status(200).json(thought);
                    });
                } else {
                    res.status(404).json({message: "No thought with this id"});
                }
            });
        } catch (err) {
            console.log('err', err);
            res.status(400).json(err);
        }
    },
    deleteThoughtReaction ({ params }, res) {
        console.log('IN DEVELOPMENT >> deleteThoughtReaction');
        console.log('params', params);
        try {
            Thought.findOne({ _id: params.id })
            .then(thoughtData => {
                if (thoughtData) {
                    thoughtData.reactions = thoughtData.reactions.filter(reaction => reaction._id != params.reactionId);
                    thoughtData.save()
                    .then(result => res.status(200).json(result));
                } else {
                    res.status(404).json({ message: 'No thought with this ID' });
                }
            });
        } catch (err) {
            console.log('err', err);
            res.status(400).json(err);
        }
        /*
        console.log('params', params);
        */
    },
    deleteThought ({ params }, res) {
        console.log('deleteThought');
        console.log('params', params);
        try {
            Thought.findOneAndDelete({ _id: params.id })
            .then(thoughtData => 
                thoughtData ? 
                res.status(200).json(thoughtData) : 
                res.status(404).json({ message: 'No thought with this ID' })
            )
        }
        catch(err) {
            console.log('err', err);
            res.status(400).json(err);
        }
    }
}

module.exports = thoughtController;