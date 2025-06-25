import { DateTime } from 'luxon';

class DateTimeService {
  public getCurrentDateTime(): string {
    return DateTime.now().setZone('Asia/Bangkok').toFormat('yyyy-MM-dd HH:mm:ss');
  }
  public formatJSDateTime(dateTime: any): string {
    return DateTime.fromJSDate(dateTime,{zone:'Asia/Bangkok'}).toFormat('yyyy-MM-dd HH:mm:ss');
  }
  public formatISODateTime(dateTime: any): string {
    return DateTime.fromISO(dateTime, { zone: 'Asia/Bangkok' }).toFormat('yyyy-MM-dd HH:mm:ss');
  }
}

export default new DateTimeService();
