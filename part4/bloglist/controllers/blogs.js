const jwt = require("jsonwebtoken");
const blogsRouter = require("express").Router();
const config = require("../utils/config");
const Blog = require("../models/blog");
const User = require("../models/user");

// Create
blogsRouter.post("/", async (request, response) => {
  const { title, author, url, likes } = request.body;

  const decodedToken = jwt.verify(request.token, config.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  // const user = await User.findById(request.user.id);
  const { user } = request;

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
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

// Read All
blogsRouter.get("/", async (_request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  });

  response.json(blogs);
});

// Update
blogsRouter.put("/:id", async (request, response) => {
  const { id } = request.params;
  const { title, author, url, likes } = request.body;

  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    {
      title,
      author,
      url,
      likes,
    },
    { new: true }
  );

  response.json(updatedBlog);
});

// Delete
blogsRouter.delete("/:id", async (request, response) => {
  const decodedToken = jwt.verify(request.token, config.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  // const user = await User.findById(decodedToken.id);
  const { user } = request;
  const blogToRemove = await Blog.findById(request.params.id);

  if (user.id === blogToRemove.user.toString()) {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } else {
    response.status(401).send({ error: "blog does not belong to user" });
  }
});

module.exports = blogsRouter;
