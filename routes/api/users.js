const router = require('express').Router();
const { 
    getAllUser, 
    getUserById, 
    postNewUser, 
    putUpdateUser,  
    postAddFriend, 
    deleteUser, 
    deleteUserFriend 
} = require('../../controllers/user-controller');

router.route('/')
    .get(getAllUser)
    .post(postNewUser);

router.route('/:userId')
    .get(getUserById)
    .put(putUpdateUser)
    .delete(deleteUser);

router.route('/:userId/friend/:friendId')
    .post(postAddFriend)
    .delete(deleteUserFriend)

module.exports = router;
