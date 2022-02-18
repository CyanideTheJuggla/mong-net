const User = require('../models/User')

const userController = { 
    getAllUser(req, res) {
        console.log('getAllUser');
        User.find({})
        .then(userData => res.status(200).json(userData))
        .catch(err => {
            console.log('err', err);
            res.status(400).json(err);
        })
    },
    getUserById({ params }, res) {
        console.log('getUserById');
        console.log('params', params);
        User.findOne({ _id: params.id })
        .then(userData => userData ? res.status(200).json(userData) : res.status(404).json({ message: 'No user with this ID' }))
        .catch(err => {
            console.log('err', err);
            res.status(400).json(err);
        });
    },
    getUserFriends({ params, body }, res) {
        console.log('putUpdateUser');
        console.log('params', params);
        console.log('body', body);
        const userId = params.id;
        const friendId = body.friends[0];
        User.findOneAndUpdate({ _id: userId }, body, { new: true })
        .then(userData => {
            if(userData) {
                User.findOne({_id: friendId}).then(friend => {
                    const friendsArry = friend.friends;
                    friendsArry.push(userId);
                    User.updateOne({_id: friend.id}, {friends: friendsArry})
                })
                //res.status(200).json(userData); 
            } else {
                res.status(404).json({ message: 'No user with this ID' })
            }
        })
        .catch(err => {
            console.log('err', err);
            res.status(400).json(err);
        });
    },
    postNewUser({ body }, res) {
        console.log('postNewUser');
        console.log('body', body);
        User.create(body)
        .then(userData => res.status(200).json(userData))
        .catch(err => {
            console.log('err', err);
            res.status(400).json(err);
        })
    },
    putUpdateUser({ params, body }, res) {
        console.log('putUpdateUser');
        console.log('params', params);
        console.log('body', body);
        User.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then(userData => userData ? res.status(200).json(userData) : res.status(404).json({ message: 'No user with this ID' }))
        .catch(err => {
            console.log('err', err);
            res.status(400).json(err);
        });
    },
    putAddFriend({ params, body }, res) {
        console.log('putAddFriend');
        console.log('params', params);
        console.log('body', body);
        const userId = params.id;
        const friendId = body.friends[0];
        User.findOneAndUpdate({ _id: userId }, body, { new: true })
        .then(userData => {
            if(userData) {
                User.findOne({_id: friendId})
                .then(friend => {
                    friend.friends.push(userId);
                    User.updateOne({_id: friend.id}, friend)
                    .then(friendData => 
                        friendData ?
                            res.status(200).json(friendData) : 
                            res.status(404).json({ message: 'No user with this ID' }))
                    .catch(err => {
                        console.log('err', err);
                        res.status(400).json(err);
                    })
                })
                //res.status(200).json(userData); 
            } else {
                res.status(404).json({ message: 'No user with this ID' })
            }
        })
        .catch(err => {
            console.log('err', err);
            res.status(400).json(err);
        });
    },
    deleteUserFriend ({ params }, res) {
        console.log('NOT IMPLEMENTED >> deleteUserFriend');
        /*
        console.log('params', params);
        User.findOneAndDelete({ _id: params.id })
        .then(userData => userData ? res.status(200).json(userData) : res.status(404).json({ message: 'No user with this ID' }))
        .catch(err => {
            console.log('err', err);
            res.status(400).json(err);
        });*/
    },
    deleteUser ({ params }, res) {
        console.log('deleteUser');
        console.log('params', params);
        User.findOneAndDelete({ _id: params.id })
        .then(userData => userData ? res.status(200).json(userData) : res.status(404).json({ message: 'No user with this ID' }))
        .catch(err => {
            console.log('err', err);
            res.status(400).json(err);
        });
    }
}

module.exports = userController;