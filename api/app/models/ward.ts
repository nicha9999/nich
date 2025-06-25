
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Ward extends BaseModel {

  public static table = 'ward'

  @column({isPrimary: true})
  declare ward_id: string

  @column()
  declare ward_name: string
}