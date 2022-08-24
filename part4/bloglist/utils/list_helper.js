const totalLikes = (blogs) =>
  blogs.reduce((total, blog) => total + blog.likes, 0);

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {};

  let mostLikes = 0;
  let favoriteBlogIndex = 0;

  blogs.forEach((blog, index) => {
    if (blog.likes > mostLikes) {
      mostLikes = blog.likes;
      favoriteBlogIndex = index;
    }
  });

  return blogs[favoriteBlogIndex];
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {};

  const blogCounts = {};
  let result = {
    author: "",
    blogs: 0,
  };

  blogs.forEach((blog) => {
    blogCounts[blog.author] = (blogCounts[blog.author] || 0) + 1;
  });

  Object.entries(blogCounts).forEach((blogger) => {
    if (blogger[1] > result.blogs) {
      result = { author: blogger[0], blogs: blogger[1] };
    }
  });

  return result;
};

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
