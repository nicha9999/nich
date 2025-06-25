/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import authRoutes from './routes/auth.js'
import { userRoute } from './routes/user.js'
import { middleware } from './kernel.js'

router.group(() => {
  router.get('/', async () => {
    return {
      message: 'kips web lerning api',
    }
  })

  authRoutes()
  router.group(() => {
    userRoute()
  }).use(middleware.auth())
}).prefix('api/v1')