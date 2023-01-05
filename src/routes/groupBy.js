const { Router } = require('express');
const { fetchBooksDataController } = require('../controllers/fetchBooksData');

const groupByRouter = Router();

groupByRouter.get('/groupBy', (request, response, next) => {
  next();
}, (request, response) => {
  try {
    const isFormatted = true;
    fetchBooksDataController(isFormatted, request.query.groupBy).then((groupedData) => {
      response.status(200).send(groupedData);
    });
  } catch (err) {
    response.status(500).send('Something broke!');
  }
});

module.exports = { groupByRouter };
