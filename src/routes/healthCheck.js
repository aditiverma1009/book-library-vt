const { Router } = require('express');

const healthCheckRouter = Router();

healthCheckRouter.get('/', (request, response) => {
  try {
    response.status(200).send('Success!');
  } catch (err) {
    response.status(500).send('Something broke!');
  }
});

module.exports = { healthCheckRouter };
