const listHelper = require("../utils/list_helper");
const blogTestData = require("./test_data");

describe("total likes", () => {
  const blogList = blogTestData;
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

  test("of empty list is 0", () => {
    const result = listHelper.totalLikes(blogListEmpty);
    expect(result).toBe(0);
  });

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(blogListOne);
    expect(result).toBe(5);
  });
});