import { defineConfig } from '@adonisjs/auth'
import env from '#start/env'
import { sessionUserProvider } from '@adonisjs/auth/session'
import { Authenticators, InferAuthEvents } from '@adonisjs/auth/types'
import { JwtGuard } from '../app/auth/guards/jwt.js'

const jwtConfig = {
  secret: env.get('APP_KEY'),
}

const userProvider = sessionUserProvider({
  model: () => import('#models/user'),
})


const authConfig = defineConfig({
  default: 'jwt',
  guards: {
    jwt: (ctx) => new JwtGuard(ctx, userProvider, jwtConfig),
  },
})

export default authConfig

declare module '@adonisjs/auth/types' {
  interface Authenticators extends InferAuthenticators<typeof authConfig> {}
}

// declare module '@adonisjs/auth/types' {
//   interface Authenticators extends InferAuthenticators<typeof authConfig> {}
// }
declare module '@adonisjs/core/types' {
  interface EventsList extends InferAuthEvents<Authenticators> {}
}
