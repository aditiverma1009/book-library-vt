const axios = require('axios');
const { ALL_BOOKS_URL, BOOK_RATING } = require('../../src/constants');
const { fetchBooksDataController } = require('../../src/controllers/fetchBooksData');

jest.mock('axios');

const books = {
  data: {
    books: [
      {
        Author: 'J K Rowling',
        id: 30,
        Name: 'Harry Potter and the Prisoner of Azkaban (Harry Potter, #3)'
      },
      {
        Author: 'J K Rowling',
        id: 40,
        Name: 'Harry Potter and the Goblet of Fire (Harry Potter, #4)'
      },
      {
        Author: 'Sidney Sheldon',
        id: 90,
        Name: 'Master of the Game'
      },
      {
        Author: 'Sidney Sheldon',
        id: 110,
        Name: 'The Other Side of Midnight (Midnight #1)'
      }
    ]
  }
};

describe('test for fetching data for books', () => {
  axios.get
    .mockImplementation((url) => {
      switch (url) {
      case ALL_BOOKS_URL:
        return Promise.resolve(books);

      case `${BOOK_RATING}30`: // BOOK_RATING
        return Promise.resolve({
          data: {
            rating: 5
          }
        });

      default:
        return Promise.resolve({
          data: {
            rating: 4.5
          }
        });
      }
    });

  it('should return list of book when not formatted', async () => {
    expect((await fetchBooksDataController(false, 'Author'))).toEqual([{
      Author: 'J K Rowling',
      id: 30,
      Name: 'Harry Potter and the Prisoner of Azkaban (Harry Potter, #3)',
      rating: 5
    },
    {
      Author: 'J K Rowling',
      id: 40,
      Name: 'Harry Potter and the Goblet of Fire (Harry Potter, #4)',
      rating: 4.5
    },
    {
      Author: 'Sidney Sheldon',
      id: 90,
      Name: 'Master of the Game',
      rating: 4.5
    },
    {
      Author: 'Sidney Sheldon',
      id: 110,
      Name: 'The Other Side of Midnight (Midnight #1)',
      rating: 4.5
    }]);
  });
});
