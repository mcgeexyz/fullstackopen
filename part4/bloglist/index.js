// const http = require('http');
const express = require('express');
require('dotenv').config();

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

// Database
const Blog = mongoose.model('Blog', blogSchema);

const mongoUrl = process.env.MONGODB_URI;
mongoose.connect(mongoUrl);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/blogs', (_request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

// Run Express app
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
