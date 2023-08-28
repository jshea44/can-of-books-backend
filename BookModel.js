'use-strict';

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
    enum: ['Must Read', 'Read when you have time', 'Skip'],
  },
});

const BookModel = mongoose.model('book', BookSchema);

module.exports = BookModel;
