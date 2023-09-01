'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const BookModel = require('./BookModel.js');

const authorize = require('./auth/authorize.js');

const PORT = process.env.PORT || 3001;
const MONGODB_URL = process.env.MONGODB_URL;
const app = express();
app.use(cors());
app.use(express.json());
app.use(authorize); // apply authentication token checking

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

// read single book object
app.get('/books/:bookTitle', (request, response) => {
  response.send(
    'You have hit the single book route' + request.params.bookTitle
  );
});

// create new book
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

// delete a book
app.delete('/books/:bookId', async (request, resposne) => {
  if (!request.params.bookId) {
    request.status(404).send('Please provide a valid book.');
    return;
  }
  let result = await BookModel.findByIdAndDelete(request.params.bookId);
  resposne.status(204).send('Successfully deleted.');
});

// update  a book
app.put('/books/:bookId', async (request, response) => {
  let id = request.params.bookId;

  try {
    await BookModel.replaceOne({ _id: id }, request.body);
    let newBook = await BookModel.findOne({ _id: id });
    response.status(200).json(newBook);
  } catch (e) {
    response.status(400).send(e);
  }
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
