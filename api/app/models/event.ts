import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Events extends BaseModel {

  public static table = 'events'
  @column({ isPrimary: true })
  declare hn: string

  @column({ columnName: 'model_id'})
  declare model_id: number

  @column({ columnName: 'event_data'})
  declare event_data: string;
  
}