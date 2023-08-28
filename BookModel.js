'use strict';

const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    // enum: ['Must Read', 'Read when you have time', 'Skip'],
    required: true,
  },
});

const BookModel = mongoose.model('books', BookSchema);

module.exports = BookModel;
