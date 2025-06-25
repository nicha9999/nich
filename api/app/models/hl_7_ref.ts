import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Hl7Ref extends BaseModel {
  public static table = 'hl7_ref'
  @column({ isPrimary: true, columnName: 'hl7_ref_id' })
  declare hl_7_ref_id: number //hl_7_ref_id hl7_ref_id

  @column()
  declare model: string

  @column()
  declare code: string

  @column()
  declare cms_code: string

  @column()
  declare name_ref: string

  @column()
  declare value: string

  @column()
  declare vital_sign_id: number
}