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

module.exports = {
  totalLikes,
  favoriteBlog,
};
