import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Serial extends BaseModel {
  public static table = 'serial'
  @column({ isPrimary: true })
  declare name: string

  @column()
  declare serial_no: number

}