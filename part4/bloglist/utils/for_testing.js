const reverse = (string) => string.split("").reverse().join("");

const average = (array) => {
  const total = array.reduce((sum, num) => sum + num, 0);
  return total === 0 ? 0 : total / array.length;
};

module.exports = {
  reverse,
  average,
};
