const Model = require('../../models');

function saveLikeUnlike(bookId, likeUnlike) {
  return Model.Books.update({
    likeUnlike
  }, {
    where: {
      book_id: bookId
    }
  });
}

module.exports = { saveLikeUnlike };
