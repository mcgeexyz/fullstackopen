const blogsRouter = require("express").Router();
const { application } = require("express");
const blog = require("../models/blog");
const Blog = require("../models/blog");

// Create
blogsRouter.post("/", (request, response, next) => {
  const { title, author, url, likes } = request.body;

  if (!title) {
    return response.status(400).send({ error: "missing title" });
  }

  if (!url) {
    return response.status(400).send({ error: "missing url" });
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes,
  });

  blog
    .save()
    .then((savedBlog) => {
      response.status(201).json(savedBlog);
    })
    .catch((error) => next(error));
});

// Read All
blogsRouter.get("/", async (_request, response, next) => {
  try {
    const blogs = await Blog.find({});
    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

// Update
blogsRouter.put("/:id", async (request, response, next) => {
  try {
    const { id } = request.params;
    const { title, author, url, likes } = request.body;
    const blogObject = { title, author, url, likes };

    const updatedBlog = await Blog.findByIdAndUpdate(id, blogObject, {
      new: true,
    });

    response.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

// Delete
blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    await blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
