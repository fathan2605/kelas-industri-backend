/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import BooksController from '#controllers/books_controller'

  router.get('/', async () => {
    return {
      hello: 'hitam',
    }
  })

router
  .group(() => {
  router.get('/', [BooksController,'index'])
  router.post('/', [BooksController,'store'])
  router.get('/:id', [BooksController,'show'])
  router.put('/:id', [BooksController,'update'])
  router.delete('/:id', [BooksController,'destroy'])
  }) 
  .prefix('/books')