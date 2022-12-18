const express = require('express')
const router = express.Router()

router.use((req, res, next)=> {
    console.log('middle ware for health check route')
    next()
})

router.get('/', (request, response)=> {
    response.send('Hello World!')
})

module.exports = router