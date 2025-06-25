import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Drugitem extends BaseModel {
  @column({ isPrimary: true })
  declare icode: string

  @column() 
  declare name: string

  @column()
  declare active: string
}