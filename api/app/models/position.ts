import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Position extends BaseModel {
  
  public static table = 'positions'
  @column({ isPrimary: true })
  declare positionId: number

  @column()
  declare positionName: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}