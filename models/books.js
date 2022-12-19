'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Books extends Model {
    static associate(models) {
    }
  }
  Books.init({
    book_id: { type: DataTypes.INTEGER, primaryKey: true },
    name: DataTypes.STRING,
    author: DataTypes.STRING,
    rating: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Books',
  });
  return Books;
};