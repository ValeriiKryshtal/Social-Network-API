const express = require('express');
const {
     getAllThoughts,
     getThoughtById,
     addNewThought,
     updateThoughtById,
     removeThoughtById,
     addReaction,
     deleteReaction
} = require('../../controllers/thought-controller');

const router = express.Router();

router.get('/', getAllThoughts);
router.get('/:id', getThoughtById);
router.delete('/:id', removeThoughtById);
router.post('/', addNewThought);
router.patch('/:id', updateThoughtById);

router.post('/:thoughtId/reactions', addReaction);
router.delete('/:thoughtId/reactions/:reactionId', deleteReaction);

module.exports = router;