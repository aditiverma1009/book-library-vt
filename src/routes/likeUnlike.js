const { Router } = require('express');
const { saveLikeUnlikeController } = require('../controllers/saveLikeUnlike');

const likeUnlikeRouter = Router();

likeUnlikeRouter.post('/book/:book_id/like/:like', ({ params }, response) => {
  try {
    saveLikeUnlikeController(params.book_id, params.like === 'true').then((result) => {
      response.status(200).send(result);
    });
  } catch (err) {
    response.status(500).send('Something broke!');
  }
});

module.exports = { likeUnlikeRouter };
