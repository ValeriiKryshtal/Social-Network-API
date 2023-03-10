const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const URL = 'mongodb://127.0.0.1:27017/HRUN_test';

const PORT = 3000;

const app = express();
app.use(express.json());
app.use(routes);

mongoose
     .connect(URL)
     .then(() => console.log('Connected to MongoDB'))
     .catch((err)=> console.log(`DB connection error: ${err}`))

app.listen(PORT, (err) => {
               err ? console.log(err) : console.log(`Listening port ${PORT}`);
          });
