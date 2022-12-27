const { Router } = require('express');
const { fetchBooksDataController } = require('../controllers/fetchBooksData');

const groupByRouter = Router();

groupByRouter.get('/groupByAuthors', (request, response, next) => {
  next();
}, (_, response) => {
  try {
    const isFormatted = true;
    fetchBooksDataController(isFormatted).then((groupedData) => {
      response.status(200).send(groupedData);
    });
  } catch (err) {
    response.status(500).send('Something broke!');
  }
});

module.exports = { groupByRouter };
