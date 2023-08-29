'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const BookModel = require('./BookModel.js');

const PORT = process.env.PORT || 3001;
const MONGODB_URL = process.env.MONGODB_URL;
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(MONGODB_URL);

// read all books from database
app.get('/books', async (request, response) => {
  try {
    let documents = await BookModel.find({});
    response.json(documents);
  } catch (e) {
    console.log('something went wrong when finding all books', e);
    response.status(500).send(e);
  }
});

// read sinlge book object
app.get('/books/:bookTitle', (request, response) => {
  response.send(
    'You have hit the single book route' + request.params.bookTitle
  );
});

app.post('/books', async (request, response) => {
  console.log('BODY: ', request.body);
  let { title, description, status } = request.body;
  if (!title || !description || !status) {
    response.status(400).send('Please send book object as JSON');
    return;
  }
  let book = new BookModel({ title, description, status });
  let document = await book.save();
  response.json(document);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
