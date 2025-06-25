import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class MachineWorkDrug extends BaseModel {

  public static table = 'machine_work_drug'
  @column({ isPrimary: true })
  declare hos_guid: string

  @column()
  declare icode: string

  @column()
  declare usage: string;

  @column()
  declare serial_number: string;

}