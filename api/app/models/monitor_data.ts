import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class MonitorData extends BaseModel {
  @column({ isPrimary: true })
  declare id: string;

  @column()
  declare description: string;

  @column()
  declare version: string;

  @column()
  declare value: any;

  @column({ columnName: 'unit_id' })
  declare unitId: string;

  @column({ columnName: 'unit_description' })
  declare unitDescription: string;

  @column()
  declare min: any;

  @column()
  declare max: any;

  @column()
  declare flag: string;

  @column.dateTime()
  declare timestamp: DateTime;

  @column()
  declare active: string | null | undefined
}