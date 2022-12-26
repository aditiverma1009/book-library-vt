const Model = require('../../models');
const { fetchBooksData } = require('./fetchBooksData');

const saveBooksToDB = () => fetchBooksData(false)
  .then((data) => Model.Books.bulkCreate(data.map((eachData) => ({
    author: eachData.Author,
    book_id: eachData.id,
    name: eachData.Name,
    rating: parseInt(eachData.rating, 10),
    likeUnlike: 0
  }))));

module.exports = { saveBooksToDB };
