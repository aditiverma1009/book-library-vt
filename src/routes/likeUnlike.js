const { Router } = require('express');
const { saveLikeUnlikeController } = require('../controllers/saveLikeUnlike');

const likeUnlikeRouter = Router();

likeUnlikeRouter.post('/book/:book_id/like/:like', ({ params }, response) => {
  try {
    console.log(params);
    const result = saveLikeUnlikeController(params.book_id, (Boolean)(params.like));
    console.log(result);
    response.status(200).send('Like/Unlike', result);
  } catch (err) {
    response.status(500).send('Something broke!');
  }
});

module.exports = { likeUnlikeRouter };
