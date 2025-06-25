import { DateTime } from 'luxon';
import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class MachineHistory extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare serialNumber: string;

  @column.dateTime()
  declare timestamp: DateTime;

  @column()
  declare data: object;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;
}