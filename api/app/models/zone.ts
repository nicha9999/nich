import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Zone extends BaseModel {
  
  public static table = 'zone'

  @column({ isPrimary: true })
  declare zone_id: number

  @column()
  declare zone_name: string

  @column()
  declare zone_code: string 

}