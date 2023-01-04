const { Router } = require('express');
const Model = require('../../models');

const healthCheckRouter = Router();

healthCheckRouter.get('/', (request, response) => {
  try {
    Model.Books.findAllBooksinOrder().then(() => {
      console.log('success');
      response.send(200);
    });
    response.status(200).send('Success!');
  } catch (err) {
    response.status(500).send('Something broke!');
  }
});

module.exports = { healthCheckRouter };
