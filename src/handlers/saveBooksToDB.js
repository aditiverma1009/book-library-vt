const axios = require('axios');
const { EmptyResultError } = require('sequelize');
const books = require('../../models/books');
const Model = require('../../models');
const { fetchBooksData } = require('./fetchBooksData');

function saveBooksToDB(isFormatted) {
        return fetchBooksData(false).then((data)=> {
            return Model.Books.bulkCreate(data.map(eachData=>{
                return {
                    author: eachData.Author,
                    book_id: eachData.id,
                    name: eachData.Name,
                    rating: parseInt(eachData.rating)
                }
            }))
        })
}

module.exports = { saveBooksToDB }