const { where } = require('sequelize')
const Model = require('../../models')
function saveLikeUnlike(book_id, likeUnlike) {
    return Model.Books.update({
        likeUnlike: likeUnlike
    }, {
        where: {
            book_id: book_id
        }
    })
}

module.exports = { saveLikeUnlike }