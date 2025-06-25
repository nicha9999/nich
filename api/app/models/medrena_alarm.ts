import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class MedrenaAlarm extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare alarm_type: string

  @column()
  declare alarm_level: string

  @column()
  declare reason: string 

  @column()
  declare solution: string
}