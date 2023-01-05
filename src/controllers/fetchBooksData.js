const axios = require('axios');
const { ALL_BOOKS_URL, BOOK_RATING } = require('../constants');
const { formatData, mergeData } = require('../utils/index');

// Always used modules, not require
// use err, response convention and if value not used _
// 0. routes structure change => done
// 1. Accept the book id as a path parameter and return all the book details without the book rating
// 2. Accept the book Author name as a query parameter & return an array of book names by the author
// 3. Generate swagger documentation autogenerate
// https://www.npmjs.com/package/swagger-ui-express
// https://www.youtube.com/watch?v=eiSem0cqaN0
// https://swagger.io/tools/swagger-codegen/
// swagger-jsdoc
// 4. send proper error => done
// 5. use validation
// 6. seperate out fns for api call, by passing url and callback fn to it
// type orm , sequelise, prisma

const getAllBooks = async () => {
  return axios.get(ALL_BOOKS_URL);
};

const getRatingForBookID = async (id) => {
  return axios.get(`${BOOK_RATING}${id}`);
};

// eslint-disable-next-line no-unused-vars
const fetchBooksDataController = async (toBeFormatted, groupBy) => {
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
    console.log(ratingData);
  } catch (err) {
    throw new Error('Could not get rating for all books');
  }
  const formattedRating = ratingData.map((eachRating) => eachRating.data);
  const mergedBookRatingData = mergeData(allBooks.data.books, formattedRating);
  return toBeFormatted ? formatData(mergedBookRatingData, groupBy) : mergedBookRatingData;
};

module.exports = { fetchBooksDataController };
