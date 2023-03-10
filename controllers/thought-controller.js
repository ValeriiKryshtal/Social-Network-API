const Thought = require('../models/Thought');
const User = require('../models/User')

const handleError = (res, error) => {
     res.status(500).json({error});
};

const getAllThoughts = (req, res) => {
     Thought
     .find()
     .select('-__v')
     .sort({ _id: -1 })
     .then((thoughts)=>{
          res
          .status(200)
          .json(thoughts)
     })
     .catch((err)=> handleError(res, err))
};

const getThoughtById = (req, res) => {
     Thought
          .findById(req.params.id)
          .then((thought)=>{
               res
               .status(200)
               .json(thought)
          })
          .catch((err)=> handleError(res, err))
};

const removeThoughtById = (req, res) => {
     Thought
          .findByIdAndDelete(req.params.id)
          .then((result)=>{
               res
               .status(200)
               .json(result)
          })
          .catch((err)=> handleError(res, err))
};

const addNewThought = ({ body }, res) => {
     Thought.create(body)
               .then(({ _id }) => {
               return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
               );
               })
          .then((result)=>{
               res
               .status(201)
               .json(result)
          })
          .catch((err)=> handleError(res, err))
};

const updateThoughtById = (req, res) => {
     Thought
          .findByIdAndUpdate(req.params.id, req.body)
          .then((result)=>{
               res
               .status(200)
               .json(result)
          })
          .catch((err)=> handleError(res, err))
};

const addReaction = ( { params, body } , res) => {
     Thought
          .findByIdAndUpdate(
               {_id: params.thoughtId}, 
               {$push: {reactions: body}}, 
               {new: true})
               .populate({path: 'reactions', select: '-__v'})
               .select('-__v')
               .then((result)=>{
                    res
                    .status(200)
                    .json(result)
               })
               .catch((err)=> handleError(res, err))
}

const deleteReaction = ( { params } , res) => {
     Thought
          .findByIdAndDelete(
               {_id: params.thoughtId}, 
               {$pull: { reactions: { reactionId: params.reactionId } }}, 
               {new: true})
               .then((result)=>{
                    res
                    .status(200)
                    .json(result)
               })
               .catch((err)=> handleError(res, err))
}

module.exports = {
     getAllThoughts,
     getThoughtById,
     addNewThought,
     updateThoughtById,
     removeThoughtById,
     addReaction,
     deleteReaction
}