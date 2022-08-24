const listHelper = require("../utils/list_helper");
const blogTestData = require("./test_data");

const blogListEmpty = [];
const blogListOne = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
];

describe("total likes", () => {
  test("of empty list is 0", () => {
    const result = listHelper.totalLikes(blogListEmpty);
    expect(result).toBe(0);
  });

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(blogListOne);
    expect(result).toBe(5);
  });

  test("when list has many blogs, equals the sum of all blogs likes", () => {
    const result = listHelper.totalLikes(blogTestData);
    expect(result).toBe(36);
  });
});

describe("favorite blog", () => {
  test("when list has many blogs, returns the blog with the highest like count", () => {
    const result = listHelper.favoriteBlog(blogTestData);
    expect(result.likes).toBe(12);
  });

  test("when list has one blog, returns the only blog", () => {
    const result = listHelper.favoriteBlog(blogListOne);
    expect(result.likes).toBe(5);
  });

  test("when list is empty, returns null", () => {
    const result = listHelper.favoriteBlog(blogListEmpty);
    expect(result).toEqual({});
  });
});
