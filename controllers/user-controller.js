const User = require('../models/User');

const handleError = (res, error) => {
     res.status(500).json({error});
};

const getAllUsers = (req, res) => {
     User
     .find()
     .populate({path: 'thoughts', select: '-__v'})
     .populate({path: 'friends', select: '-__v'})
     .select('-__v')
     .then((users)=>{
          res
          .status(200)
          .json(users)
     })
     .catch((err)=> handleError(res, err))
};

const getUserById = (req, res) => {
     User
          .findById(req.params.id)
          .populate({path: 'thoughts', select: '-__v'})
          .populate({path: 'friends', select: '-__v'})
          .then((user)=>{
               res
               .status(200)
               .json(user)
          })
          .catch((err)=> handleError(res, err))
};

const removeUserById = (req, res) => {
     User
          .findByIdAndDelete(req.params.id)
          .then((result)=>{
               res
               .status(200)
               .json(result)
          })
          .catch((err)=> handleError(res, err))
};

const addNewUser = (req, res) => {
     const user = new User(req.body);
     user
          .save()
          .then((result)=>{
               res
               .status(201)
               .json(result)
          })
          .catch((err)=> handleError(res, err))
};

const updateUserById = (req, res) => {
     User
          .findByIdAndUpdate(req.params.id, req.body)
          .then((result)=>{
               res
               .status(200)
               .json(result)
          })
          .catch((err)=> handleError(res, err))
};

const addFriendToUser = ( { params }, res) => {
     User
          .findByIdAndUpdate(
               { _id: params.userId },
               { $push: { friends: params.friendId } },
               { new: true }
          )
          .then((result)=>{
               res
               .status(200)
               .json(result)
          })
          .catch((err)=> handleError(res, err))
};

const deleteFriendFromUser = ( { params }, res) => {
     User
          .findByIdAndUpdate(
               { _id: params.userId },
               { $pull: { friends: params.friendId } },
               { new: true }
          )
          .then((result)=>{
               res
               .status(200)
               .json(result)
          })
          .catch((err)=> handleError(res, err))
};

module.exports = {
     getAllUsers,
     getUserById,
     addNewUser,
     updateUserById,
     removeUserById,
     addFriendToUser,
     deleteFriendFromUser
}