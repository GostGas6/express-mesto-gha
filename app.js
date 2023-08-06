const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/userRoutes');

const {
  PORT = 3000,
  BASE_PATH = 'http://localhost',
  MONGODB_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false
});

const app = express();

//middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '64c3bfb7df7e40ff39b8d5ab'
  };
  next();
});
// routers
app.use('/', userRouter);

app.listen(PORT, () => {
  console.log('Ссылка на сервер');
  console.log(`${BASE_PATH}:${PORT}`);
});