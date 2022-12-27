const axios = require('axios');
const { ALL_BOOKS_URL, BOOK_RATING } = require('../constants');
const { formatData, mergeData } = require('../utils/index');

// seperate out fns for api call, by passing url and callback fn to it
// use validation
// use err, response convention and if value not used _
// routes structure change
// Always used modules, not require checl

const getAllBooks = async () => axios({
  method: 'get',
  url: ALL_BOOKS_URL,
  headers: {
    'content-type': 'application/json'
  }
});

const getRatingForBookID = async (id) => axios({
  method: 'get',
  url: `${BOOK_RATING}${id}`,
  headers: {
    'content-type': 'application/json'
  }
});

// eslint-disable-next-line no-unused-vars
const fetchBooksData = async (toBeFormatted) => {
  const { data: allBooks } = await getAllBooks();
  // eslint-disable-next-line max-len
  const ratingData = await Promise.all(allBooks.books.map(async (eachBook) => getRatingForBookID(eachBook.id)));
  const formattedRating = ratingData.map((eachRating) => eachRating.data);
  const mergedBookRatingData = mergeData(allBooks.books, formattedRating);
  return toBeFormatted ? formatData(mergedBookRatingData) : mergedBookRatingData;
};

module.exports = { fetchBooksData };
