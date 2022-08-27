const blogsRouter = require("express").Router();
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

module.exports = blogsRouter;
