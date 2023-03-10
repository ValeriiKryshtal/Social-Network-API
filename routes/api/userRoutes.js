const express = require('express');
const {
     getAllUsers,
     getUserById,
     addNewUser,
     updateUserById,
     removeUserById,
     addFriendToUser,
     deleteFriendFromUser
} = require('../../controllers/user-controller')

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.delete('/:id', removeUserById);
router.post('/', addNewUser);
router.patch('/:id', updateUserById);

router.post('/:userId/friends/:friendId', addFriendToUser);
router.delete('/:userId/friends/:friendId', deleteFriendFromUser);



module.exports = router;