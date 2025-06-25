import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class ZoneDetail extends BaseModel {

  public static table = 'zone_detail'
  @column({ isPrimary: true })
  declare zone_id: number

  @column()
  declare serial_number: string

  
}