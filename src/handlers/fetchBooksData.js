const axios = require('axios');
const { formatData, mergeData } = require('../utils/index');

// seperate out fns for api call, by passing url and callback fn to it
// use constants file
// use controller and routes in express
// use validation
// use err, response convention and if value not used _
// routes structure change
// Always used modules, not require checl

function fetchBooksData(toBeFormatted) {
  return axios({
    method: 'get',
    url: 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks',
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(({ data }) => Promise.all(data.books.map((eachBook) => axios({
      method: 'get',
      url: `https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findBookById/${eachBook.id}`,
      headers: {
        'content-type': 'application/json'
      }
    })))
      .then((ratingData) => ({
        books: data.books,
        rating: ratingData.map((eachRating) => eachRating.data)
      })))
    .then((bookAndRatingData) => {
      const mergedBookRatingData = mergeData(bookAndRatingData.books, bookAndRatingData.rating);
      return toBeFormatted ? formatData(mergedBookRatingData) : mergedBookRatingData;
    })
    .catch((err) => {
      throw new Error('Something went wrong', err);
    });
}

module.exports = { fetchBooksData };
