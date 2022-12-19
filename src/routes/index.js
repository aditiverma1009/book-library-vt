const express = require('express')
const { fetchBooksData } = require('../handlers/fetchBooksData')
const { saveBooksToDB } = require('../handlers/saveBooksToDB')

const router = express.Router()

// common middleware time logger
router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})

router.get('/groupByAuthors', (request, response, next) => {
    console.log('middleware callback for auth')
    next()
}, (request, response) => {
    try {
        const isFormatted = true;
        fetchBooksData(isFormatted).then((groupedData) => {
            response.status(200).send(groupedData)
        })
    } catch (err) {
        response.status(500).send('Something broke!')
    }
})

router.get('/saveBooks', (request, response) => {
    try {
        // save books to db only if db has no books
        fetchBooksData(false).
        saveBooksToDB().then((allBooks) => {
            response.status(201).send(allBooks)
        })
    } catch (err) {
        response.status(500).send('Something broke! Books could not be saved')
    }
})

router.post('/book/:book/like/:like', (request, response) => {
    console.log(`book ${request.params.book}, like ${request.params.like}`)
    response.send('Like/ Unlike')
})

module.exports = router