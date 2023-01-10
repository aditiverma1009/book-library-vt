const { Router } = require('express');
const { saveBooksToDBController } = require('../controllers/saveBooksToDB');
const Model = require('../../models');

const saveBooksRouter = Router();

saveBooksRouter.get('/saveBooks', (request, response) => {
  try {
    Model.Books.count().then((count) => {
      console.log(count);
      if (count === 0) {
        // save books to db only if db has no books
        saveBooksToDBController().then((allBooks) => {
          response.status(201).send(allBooks);
        });
      } else {
        response.status(409).send(
          'Books already exist in DB'
        );
      }
    });
  } catch (err) {
    response.status(500).send('Something broke! Books could not be saved to DB');
  }
});

module.exports = { saveBooksRouter };
