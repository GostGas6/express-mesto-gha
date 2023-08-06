const {
  createUser,
  getAllUsers,
  getUser
} = require('../controllers/user.js');
const userRouter = require('express').Router();

userRouter.post('/users', createUser);
userRouter.get('/users', getAllUsers);
userRouter.get('/users/:id', getUser);

module.exports = userRouter