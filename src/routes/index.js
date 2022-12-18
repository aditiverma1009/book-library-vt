const express = require('express')
const router = express.Router()

// common middleware
router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})

// perform auth as middleware
router.get('/groupByAuthors', (request, response, next) => {
    console.log('middleware callback for auth')
    next()
}, (request, response) => {
    response.send('group By Authors')
})

router.get('/saveBooks', (request, response) => {
    response.send('save Books')
})

router.post('/book/:book/like/:like', (request, response) => {
    console.log(`book ${request.params.book}, like ${request.params.like}`)
    response.send('Like/ Unlike')
})

module.exports = router