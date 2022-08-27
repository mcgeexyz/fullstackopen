const Blog = require("../models/blog");
const User = require("../models/user");
const testData = require("./test_data");

const initialBlogs = testData;

const nonExistingId = async () => {
  const blog = new Blog({
    title: "test",
    url: "https://test.com",
  });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
};
