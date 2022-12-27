const formatData = (data) => {
  const authorBasedData = {};
  data.forEach((element) => {
    if (Object.keys(authorBasedData).indexOf(element.Author) !== -1) {
      authorBasedData[element.Author].push(element);
    } else {
      authorBasedData[element.Author] = [];
      authorBasedData[element.Author].push(element);
    }
  });
  return authorBasedData;
};

const mergeData = (books, rating) => {
  return books.map((eachBook, index) => ({ ...eachBook, ...rating[index] }));
};

module.exports = { formatData, mergeData };
