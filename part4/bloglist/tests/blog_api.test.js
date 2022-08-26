const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");

const api = supertest(app);

// const Blog = require("../models/blog");

jest.setTimeout(100000);

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

afterAll(() => {
  mongoose.connection.close();
});
