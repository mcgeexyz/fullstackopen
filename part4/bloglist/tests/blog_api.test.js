const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Blog = require("../models/blog");
const blogData = require("./test_data");

const api = supertest(app);

jest.setTimeout(100000);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = blogData.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(6);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("a blogs unique identifier property is named 'id'", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body[0].id).toBeDefined();
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "Monkey Coding",
    author: "Mike Ling",
    url: "https://monkeycoding.com/",
    likes: 39,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  // Total number of blogs increased by one
  const blogsAtEnd = await Blog.find({});
  expect(blogsAtEnd).toHaveLength(blogData.length + 1);

  // The title of the new blog is in the database
  const blogTitles = blogsAtEnd.map((blog) => blog.title);
  expect(blogTitles).toContain("Monkey Coding");
});

test("the blogs likes property will default to 0", async () => {
  const newBlog = {
    title: "Monkey Coding",
    author: "Mike Ling",
    url: "https://monkeycoding.com/",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  // Total number of blogs increased by one
  const blogsAtEnd = await Blog.find({});
  expect(blogsAtEnd).toHaveLength(blogData.length + 1);

  // The title of the new blog is in the database
  expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBeDefined();
});

test("creating a new blog without a title will return status 400 bad request", async () => {
  const newBlog = {
    author: "Mike Ling",
    url: "https://monkeycoding.com/",
  };

  await api.post("/api/blogs").send(newBlog).expect(400);
});

test("creating a new blog without a url will return status 400 bad request", async () => {
  const newBlog = {
    title: "Monkey Coding",
    author: "Mike Ling",
  };

  await api.post("/api/blogs").send(newBlog).expect(400);
});

describe("deletion of a note", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const allBlogs = await Blog.find({});
    const blogToDelete = allBlogs[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await Blog.find({});

    expect(blogsAtEnd).toHaveLength(allBlogs.length - 1);

    const titles = blogsAtEnd.map((r) => r.title);

    expect(titles).not.toContain(blogToDelete.title);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
