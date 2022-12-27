const { groupByRouter } = require('./groupBy');
const { healthCheckRouter } = require('./healthCheck');
const { likeUnlikeRouter } = require('./likeUnlike');
const { saveBooksRouter } = require('./saveBooks');

const router = (app) => {
  // common middleware time logger
  app.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
  });
  app.use(healthCheckRouter);
  app.use(groupByRouter);
  app.use(saveBooksRouter);
  app.use(likeUnlikeRouter);
};

module.exports = router;
