jest.mock('axios');

const formatData = (data, groupBy) => {
  const authorBasedData = {};
  data.forEach((element) => {
    if (Object.keys(authorBasedData).indexOf(element[groupBy]) !== -1) {
      authorBasedData[element[groupBy]].push(element);
    } else {
      authorBasedData[element[groupBy]] = [];
      authorBasedData[element[groupBy]].push(element);
    }
  });
  return authorBasedData;
};

const mergeData = (books, rating) => {
  return books.map((eachBook, index) => ({ ...eachBook, ...rating[index] }));
};

module.exports = { formatData, mergeData };
