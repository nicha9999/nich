import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class MachineConnect extends BaseModel {

  public static table = 'machine_connect' 

  @column({ isPrimary: true })

  declare serial_number: string

}