const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Books extends Model {
    static associate() {
    }
  }
  Books.init({
    bookId: { type: DataTypes.INTEGER, primaryKey: true },
    name: DataTypes.STRING,
    author: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    likeUnlike: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, {
    sequelize,
    modelName: 'Books'
  });
  return Books;
};
