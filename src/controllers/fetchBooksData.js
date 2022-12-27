const axios = require('axios');
const { ALL_BOOKS_URL, BOOK_RATING } = require('../constants');
const { formatData, mergeData } = require('../utils/index');

// Always used modules, not require
// use err, response convention and if value not used _
// 0. routes structure change
// 1. Accept the book id as a path parameter and return all the book details without the book rating
// 2. Accept the book Author name as a query parameter & return an array of book names by the author
// 3. Generate swagger documentation autogenerate
// https://www.npmjs.com/package/swagger-ui-express
// https://www.youtube.com/watch?v=eiSem0cqaN0
// https://swagger.io/tools/swagger-codegen/
// swagger-jsdoc
// 4. send proper error
// 5. use validation
// 6. seperate out fns for api call, by passing url and callback fn to it

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
const fetchBooksDataController = async (toBeFormatted) => {
  let allBooks = {};
  try {
    allBooks = await getAllBooks();
  } catch (err) {
    throw new Error('Could not get all books');
  }

  let ratingData = [];
  try {
    const booksData = allBooks.data.books;
    // eslint-disable-next-line max-len
    ratingData = await Promise.all(booksData.map(async (eachBook) => getRatingForBookID(eachBook.id)));
  } catch (err) {
    throw new Error('Could not get rating for all books');
  }
  const formattedRating = ratingData.map((eachRating) => eachRating.data);
  const mergedBookRatingData = mergeData(allBooks.data.books, formattedRating);
  return toBeFormatted ? formatData(mergedBookRatingData) : mergedBookRatingData;
};

module.exports = { fetchBooksDataController };
