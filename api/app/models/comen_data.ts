import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class ComenData extends BaseModel {
  
  public static table = 'comen_data'
  @column({ isPrimary: true , columnName: 'comen_data_id'})
  declare comen_data_id: number

  @column({ columnName: 'serial_no'})
  declare serial_no: string

  @column()
  declare vn: string;

  @column()
	declare an: string;

  @column()
	declare hn: string;

  @column()
	declare temp: string;

  @column()
	declare hr: string;

  @column()
	declare pr: string;

  @column()
	declare rr: string;

  @column()
	declare bps: string;

  @column()
	declare bpd: string;

  @column()
	declare map: string;

  @column({ columnName: 'spo2'})
	declare spo2: string;

  @column({ columnName: 'create_date'})
	declare create_date: Date;

  @column({ columnName: 'create_time'})
	declare create_time: any
}