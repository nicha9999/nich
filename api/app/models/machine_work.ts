import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class MachineWork extends BaseModel {

  public static table = 'machine_work'
  
  @column({ isPrimary: true })
  declare machine_work_id: number

  @column()
  declare serial_number: string

  @column()
  declare hos_guid: string

  @column()
  declare staff_start: string

  @column()
  declare start_date: DateTime

  @column()
  declare staff_stop: string 

  @column()
  declare stop_date: DateTime

  @column()
  declare active: string

}