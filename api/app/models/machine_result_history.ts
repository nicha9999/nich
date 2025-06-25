import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class MachineResultHistory extends BaseModel {

  public static table = 'machine_result_historys'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare machine_work_id: number
  
  @column()
  declare hn: string;

  @column()
  declare an: string;

  @column()
  declare vn: string;
  
  @column()
  declare bedno: string; 

  @column()
  declare serial_number: string 

  @column()
  declare state: string | null

  @column()
  declare high: string | null

  @column()
  declare mid: string | null

  @column()
  declare low: string | null

  @column()
  declare pm: string | null

  @column()
  declare vtbi: number | null

  @column()
  declare vtbi_unit: string | null

  @column()
  declare vol: number | null

  @column()
  declare vol_unit: string | null

  @column()
  declare time: string | null

  @column()
  declare time_unit: string | null

  @column()
  declare rate: number | null

  @column()
  declare rate_unit: string | null

  @column()
  declare drug: string | null

  @column()
  declare occl: number | null

  @column()
  declare occl_unit: string | null

  @column()
  declare prs: number | null

  @column()
  declare prs_unit: string | null

  @column()
  declare mmtrate: number | null

  @column()
  declare mmtrate_unit: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}