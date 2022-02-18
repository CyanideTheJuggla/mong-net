const router = require('express').Router();
const { 
    getAllUser, 
    getUserById, 
    postNewUser, 
    putUpdateUser,  
    putAddFriend, 
    getUserFriends, 
    deleteUser, 
    deleteUserFriend 
} = require('../../controllers/user-controller');

router.route('/')
    .get(getAllUser)
    .post(postNewUser);

router.route('/:id')
    .get(getUserById)
    .put(putUpdateUser)
    .delete(deleteUser);

router.route('/:id/friend')
    .get(getUserFriends)
    .put(putAddFriend)
    .delete(deleteUserFriend)

module.exports = router;
