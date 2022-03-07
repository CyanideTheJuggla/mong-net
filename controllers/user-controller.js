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
        User.findOne({ _id: params.userId })
        .then(userData => userData ? res.status(200).json(userData) : res.status(404).json({ message: 'No user with this ID' }))
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
        });
    },
    putUpdateUser({ params, body }, res) {
        console.log('putUpdateUser');
        console.log('params', params);
        console.log('body', body);
        User.findOneAndUpdate({ _id: params.userId }, body, { new: true })
        .then(userData => 
            userData ? 
                res.status(200).json(userData) : 
                res.status(404).json({ message: 'No user with this ID' }))
        .catch(err => {
            console.log('err', err);
            res.status(400).json(err);
        });
    },
    deleteUser ({ params }, res) {
        console.log('deleteUser');
        console.log('params', params);
        User.findOneAndDelete({ _id: params.userId })
        .then(userData => userData ? res.status(200).json(userData) : res.status(404).json({ message: 'No user with this ID' }))
        .catch(err => {
            console.log('err', err);
            res.status(400).json(err);
        });
    },
    /*
    getUserFriends({ params, body }, res) {
        const userId = params.userId;
        //const friendId = params.friendId;
        User.findOne({ _id: userId })
        .then(userData => {
            if(userData) {
                if(typeof(userData.friends) == typeof([]) && userData.friends.length > 0){
                    let friendUsers = [];
                    for (let i = 0; i < userData.friends.length; i++) {
                        console.log('userData.friends', userData.friends);
                        const friendId = userData.friends[i];
                        User.findById(friendId).then(friend =>{
                            console.log('friend', friend);
                            console.log('friend', friend ? true : false);
                            if(friend) friendUsers.push(friend);
                        })
                        .then(()=>{
                            userData.friends = friendUsers;
                            res.status(200).json(userData.friends); 
                        });
                    }
                } else {
                    res.status(200).json({message: 'user has no friends'})
                }

                
            } else {
                res.status(404).json({ message: 'No user with this ID' })
            }
        })
        .catch(err => {
            console.log('err', err);
            res.status(400).json(err);
        });
    },*/
    postAddFriend({ params }, res) {
        console.log('postAddFriend');
        console.log('params', params);
        const userId = params.userId;
        const friendId = params.friendId;
        User.findOne({ _id: userId })
        .then(userData => {
            if(userData) {
                const userAlreadyFriends = userData.friends.filter(val => val.toString().includes(friendId)).length > 0;
                if(!userAlreadyFriends) userData.friends.push(friendId);
                userData.save()
                .then(userSaved => {
                    User.findOne({_id: friendId})
                    .then(friend => {
                        const friendAlreadyFriends = friend.friends.filter(val => val.toString().includes(userId)).length > 0;
                        if(!friendAlreadyFriends) friend.friends.push(userId);
                        friend.save()
                        .then(friendData => friendData ? res.status(200).json({userSaved, friendData}) : res.status(404).json({message: 'Not found'}) );
                    })
                })
                
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
        console.log('INDEV >> deleteUserFriend');
        console.log(params);
        const { userId, friendId } = params;

        console.log('userId', userId);
        console.log('friendId', friendId);

        User.findOne({_id: userId})
        .then(userData => {
            userData.friends = userData.friends.filter(word => !word.toString().includes(friendId));
            userData.save()
            .then(userSaved => {
                User.findOne({_id: friendId})
                .then(friendData => {
                    friendData.friends = friendData.friends.filter(word => !word.toString().includes(userId));
                    friendData.save()
                    .then(friendSaved => res.status(200).json({ userSaved, friendSaved }));
                })
            })
        })
        /*
        console.log('params', params);
        User.findOneAndDelete({ _id: params.id })
        .then(userData => userData ? res.status(200).json(userData) : res.status(404).json({ message: 'No user with this ID' }))
        .catch(err => {
            console.log('err', err);
            res.status(400).json(err);
        });*/
    },
    
}

module.exports = userController;