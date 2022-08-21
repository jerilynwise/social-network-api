const { User } = require('../models');

const userController = {
    // Gets all users
    getAllUser(req, res) {
        User.find({})
        .populate({
            path: 'friends',
            select: '__v'
        })
        .select('__v')
        .sort({_id:1})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    // gets one user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'friends',
            select: '__v'
        })
        .select('__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    // creates a user
    createUser({body}, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err))
    },
    // updates a user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: "No user found with this id!"});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    // deletes user by id
    deleteUser({params}, res) {
        User.findOneAndDelete({_id: params.id})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    }
};

module.exports = userController;