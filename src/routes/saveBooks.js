const express = require('express')
const router = express.Router()

router.use((req, res, next)=> {
    console.log('middle ware for save book route')
    next()
})

router.get('/saveBooks', (request, response)=> {
    response.send('save Books')
})

module.exports = router