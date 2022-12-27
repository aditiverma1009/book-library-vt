const Model = require('../../models');

function saveLikeUnlikeController(bookId, likeUnlike) {
  // check if book exists in db - if doesn't send book not found
  try {
    return Model.Books.update({
      like_unlike: likeUnlike
    }, {
      where: {
        book_id: bookId
      }
    }).then(() => {
      return 'Success!';
    });
  } catch (err) {
    throw new Error('Could not save the like/unlike');
  }
}

module.exports = { saveLikeUnlikeController };
