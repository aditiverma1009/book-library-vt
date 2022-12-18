const express = require('express')
const {fetchBooksData} = require('../handlers/fetchBooksData')
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
        fetchBooksData().then((groupedData)=>{
            response.status(200).send(groupedData)
        })
    } catch(err) {
        response.status(500).send('Something broke!')
    }
})

router.get('/saveBooks', (request, response) => {
    response.send('save Books')
    
})

router.post('/book/:book/like/:like', (request, response) => {
    console.log(`book ${request.params.book}, like ${request.params.like}`)
    response.send('Like/ Unlike')
})

module.exports = router