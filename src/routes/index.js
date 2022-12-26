const express = require('express');
const { fetchBooksData } = require('../controllers/fetchBooksData');
const { saveBooksToDB } = require('../controllers/saveBooksToDB');
const { saveLikeUnlike } = require('../controllers/saveLikeUnlike');

const router = express.Router();

// common middleware time logger
router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

router.get('/', (request, response) => {
  try {
    response.status(200).send('Success!');
  } catch (err) {
    response.status(500).send('Something broke!');
  }
});

router.get('/groupByAuthors', (request, response, next) => {
  next();
}, (request, response) => {
  try {
    const isFormatted = true;
    fetchBooksData(isFormatted).then((groupedData) => {
      response.status(200).send(groupedData);
    });
  } catch (err) {
    response.status(500).send('Something broke!');
  }
});

router.get('/saveBooks', (request, response) => {
  try {
    // save books to db only if db has no books
    fetchBooksData(false).then((data) => {
      if (data.length === 0) {
        saveBooksToDB().then((allBooks) => {
          response.status(201).send(allBooks);
        });
      }
    });
  } catch (err) {
    response.status(500).send('Something broke! Books could not be saved');
  }
});

router.post('/book/:book_id/like/:like', (request, response) => {
  try {
    saveLikeUnlike(request.params.book_id, request.params.like);
  } catch (err) {
    response.status(500).send('Something broke!');
  }
  response.send('Like/ Unlike');
});

module.exports = router;
