import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class SysVar extends BaseModel {

  public static table = 'sys_var'
  
  @column({ isPrimary: true })
  declare sys_name: string

  @column()
  declare sys_value: string

}