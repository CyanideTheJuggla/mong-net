const router = require('express').Router();
const { 
    getAllThought, 
    getThoughtById, 
    postNewThought, 
    putUpdateThought,  
    putAddReaction, 
    getThoughtReactions, 
    deleteThought, 
    deleteThoughtReaction 
} = require('../../controllers/thought-controller');

router.route('/')
    .get(getAllThought)
    .post(postNewThought);

router.route('/:id')
    .get(getThoughtById)
    .put(putUpdateThought)
    .delete(deleteThought);

router.route('/:id/friend')
    .get(getThoughtReactions)
    .put(putAddReaction)
    .delete(deleteThoughtReaction)

module.exports = router;
