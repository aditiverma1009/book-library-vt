const Model = require('../../models');

function saveLikeUnlike(bookId, likeUnlike) {
  return Model.Books.update({
    like_unlike: likeUnlike
  }, {
    where: {
      book_id: bookId
    }
  });
}

module.exports = { saveLikeUnlike };
