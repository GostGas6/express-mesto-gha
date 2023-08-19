const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const cardRouter = require('./routes/cardRoutes');
const { returnErrorAsResponse } = require('./errors/returnErrorAsResponse');
const NotFoundError = require('./errors/classes/notFoundError');

const {
  PORT = 3000,
  BASE_PATH = 'http://localhost',
  MONGODB_URL = 'mongodb://localhost:27017/mestodb',
} = process.env;

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
});

const app = express();

app.use(express.json());
// routers
app.use('/', authRouter);
app.use('/', userRouter);
app.use('/', cardRouter);
app.use('*', (req, res, next) => {
  next(new NotFoundError('URI не найден'));
});
app.use(errors());
app.use((error, req, res, next) => {
  returnErrorAsResponse(error, res, {});
});

app.listen(PORT, () => {
});
