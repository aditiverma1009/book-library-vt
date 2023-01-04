const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Books extends Model {
    static associate() {
    }

    static findAllBooksinOrder = () => {
      console.log('a');
    };
  }
  Books.init({
    book_id: { type: DataTypes.INTEGER, primaryKey: true },
    name: DataTypes.STRING,
    author: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    like_unlike: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, {
    sequelize,
    modelName: 'Books'
  });
  return Books;
};
