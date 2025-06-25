import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['username'],
  passwordColumnName: 'password',
})


export default class User extends compose(BaseModel, AuthFinder) {

  public static table = 'users';

  @column({ isPrimary: true })
  declare user_id: number

  @column()
  declare fullname: string | null

  @column()
  declare email: string | null

  @column()
  declare username: string

  @column({ serializeAs: null })
  declare password: string
  
  @column()
  declare is_admin: string

  @column.dateTime()
  declare last_login: DateTime

  @column()
  declare active: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

 // static accessTokens = DbAccessTokensProvider.forModel(User)
  static accessTokens = DbAccessTokensProvider.forModel(User, {
    expiresIn: '420 mins',
    prefix: 'oat_',
    table: 'auth_access_tokens',
    type: 'auth_token',
    tokenSecretLength: 40,
  })
}