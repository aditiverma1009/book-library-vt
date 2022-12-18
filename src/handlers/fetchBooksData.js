const axios = require('axios');
const {formatData, mergeData} = require('../utils/index.js')

function fetchBooksData() {
        return axios({
        method: 'get',
        url: 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks',
        headers: {
            'content-type': 'application/json'
        }
        })
        .then(({data})=> {
            return Promise.all(data.books.map(eachBook=> {
                return axios({
                    method: 'get',
                    url: `https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findBookById/${eachBook.id}`,
                    headers: {
                        'content-type': 'application/json'
                    }
                })
            }))
            .then((ratingData)=> { return { books: data.books, rating: ratingData.map(eachRating=>{
                return eachRating.data
            })} })
        })
        .then((bookAndRatingData)=> {
            const mergedBookRatingData = mergeData(bookAndRatingData.books, bookAndRatingData.rating)
            const formattedData = formatData(mergedBookRatingData)
            return formattedData
        })
        .catch((err) => {
           throw new Error('Something went wrong', err)
        })
}

module.exports = { fetchBooksData }