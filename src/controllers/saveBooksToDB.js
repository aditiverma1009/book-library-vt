const Model = require('../../models');
const { fetchBooksDataController } = require('./fetchBooksData');

const saveBooksToDBController = () => fetchBooksDataController(false, null)
  .then((data) => {
    console.log(data);
    return Model.Books.bulkCreate(data.map((eachData) => ({
      author: eachData.Author,
      book_id: eachData.id,
      name: eachData.Name,
      rating: parseInt(eachData.rating, 10),
      like_unlike: 0
    })));
  });

module.exports = { saveBooksToDBController };
