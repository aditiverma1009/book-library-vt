const Model = require('../../models');

const saveLikeUnlikeController = async (bookId, likeUnlike) => {
  // check if book exists in db - if doesn't send book not found
  try {
    await Model.Books.update({
      like_unlike: likeUnlike
    }, {
      where: {
        book_id: bookId
      }
    });
    return 'Success!';
  } catch (err) {
    throw new Error('Could not save the like/unlike');
  }
};

module.exports = { saveLikeUnlikeController };
