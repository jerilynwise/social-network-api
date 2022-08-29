const router = require('express').Router();
const {
    getAllThoughts,
    addThought,
    updateThought,
    getThoughtById,
    removeThought,
    addReaction,
    removeReaction
} = require("../../controllers/thought-controller");


// api to get all thoughts and post a thought
router.route('/')
.get(getAllThoughts)
.post(addThought);

// api to get one thought and to update thought by id
router.route('/:thoughtId')
.get(getThoughtById)
.put(updateThought)
.delete(removeThought);

// api/thought/<userId>/<thoughtId>
router
    .route('/:thoughtId/reactions')
    .post(addReaction)


// api/thought/<userId>/<thoughtId>/<reactionId>
router
.route('/:thoughtId/reactions/:reactionId')
.delete(removeReaction);


module.exports = router;