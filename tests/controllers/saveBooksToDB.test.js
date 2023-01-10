import { ALL_BOOKS_URL, BOOK_RATING } from '../../src/constants';
import { saveBooksToDBController } from '../../src/controllers/saveBooksToDB';
import { mockBooksResponse } from './fetchBooksData.test';

const axios = require('axios');

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

jest.mock('../../models', () => {
  const originalModule = jest.requireActual('../../models');

  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn(() => {
      console.log('in here!!');
      const booksMock = {
        Books: {
          bulkCreate: jest.fn(() => new Promise({ resolve: books }))
        }
      };
      return booksMock;
    })
  };
});

describe('test save books to database', () => {
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

  it('should return success on creating data', async () => {
    expect(await saveBooksToDBController()).toEqual(mockBooksResponse);
  });
});
