import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Machine extends BaseModel {
  @column({ isPrimary: true })
  declare machine_id: number

  @column()
  declare serial_number: string

  @column()
  declare brand: string

  @column()
  declare model: string
  
  @column()
  declare staff: string

  @column()
  declare active: string

  @column.dateTime({ autoCreate: true })
  declare create_date: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare update_date: DateTime

  @column.dateTime()
  declare active_date: DateTime | null
}