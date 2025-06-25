import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Patient extends BaseModel {

  public static table = 'patient'
  
  @column({ isPrimary: true })
  declare hos_guid: string

  @column()
  declare cid: string

  @column()
  declare hn: string

  @column() 
  declare an: string
  
  @column()
  declare vn: string

  @column()
  declare fname: string

  @column()
  declare lname: string

  @column()
  declare sex: string
  
  @column()
  declare mother: string 

  @column()
  declare ward_id: string 

  @column()
  declare ward_name: string

  @column()
  declare bedno: string
}