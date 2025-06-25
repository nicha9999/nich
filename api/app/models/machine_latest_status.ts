import { DateTime } from 'luxon';
import { BaseModel, column } from '@adonisjs/lucid/orm';

export default class MachineLatestStatus extends BaseModel {
  @column({ isPrimary: true })
  declare serialNumber: string;

  @column()
  declare data: object;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;
}