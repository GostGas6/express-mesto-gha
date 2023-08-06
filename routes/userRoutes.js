const userRouter = require('express').Router();

const {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
} = require('../controllers/user');

const {
  USER_PATH = '/users',
} = process.env;

userRouter.post(`${USER_PATH}`, createUser);
userRouter.get(`${USER_PATH}`, getAllUsers);
userRouter.get(`${USER_PATH}/:id`, getUser);
userRouter.patch(`${USER_PATH}/me`, updateUser);
userRouter.patch(`${USER_PATH}/me/avatar`, updateUser);

module.exports = userRouter;
