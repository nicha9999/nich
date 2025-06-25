import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';

export enum UtcToLocalTimeFormat {
    FULL        = 'full',        // 'EEEE, MMMM d, y, h:mm:ss a zzzz'   - Monday, June 15, 2015 at 9:03:01 AM GMT+01:00
    SHORT       = 'short',       // 'd/M/yy, h:mm'                      - 15/6/15, 9:03
    SHORT_DATE  = 'shortDate',   // 'd/M/yy'                            - 15/6/15
    SHORT_TIME  = 'shortTime',   // 'h:mm'                              - 9:03
}

@Injectable({
    providedIn: 'root'
})
export class UtcConverterService {
    public convertUtcToLocalTime(
        utcDate: string,    // UTC ISO-8601
        format: UtcToLocalTimeFormat = UtcToLocalTimeFormat.FULL
    ): string {

        var browserLanguage = navigator.language;

        if (format === UtcToLocalTimeFormat.SHORT) {
            let date = new Date(utcDate).toLocaleDateString("th-TH", { timeZone: "UTC" });
            let time = new Date(utcDate).toLocaleTimeString("th-TH", { timeZone: "UTC" });

            return `${date}, ${time}`;
        }
        else if (format === UtcToLocalTimeFormat.SHORT_DATE) {
            return new Date(utcDate).toLocaleDateString("th-TH", { timeZone: "UTC" });
        }
        else if (format === UtcToLocalTimeFormat.SHORT_TIME) {
            return new Date(utcDate).toLocaleTimeString("th-TH", { timeZone: "UTC" });
        }
        else if (format === UtcToLocalTimeFormat.FULL) {
            return new Date(utcDate).toString();
        }
        else {
            console.error(
                `Do not have logic to format utc date, format:${format}`
            );
            return new Date(utcDate).toString();
        }
    }

    public convertLocalTimeToUtc(localDate: string):string {
        var date = new Date(localDate);
        return date.toUTCString();
    }

    public getDateTimeNowUtc():string{
        return formatDate(Date.now(),'yyyy-MM-dd HH:mm:ss','en-US');
      }

    public getDateNowUtc():string{
      return formatDate(Date.now(),'yyyy-MM-dd','en-US');
    }

    public getTimeNowUtc():string{
      return formatDate(Date.now(),'HH:mm:ss','en-US');
    }

    public convertSplitUtcToLocalDayMonth(localDate: string):string {
        const dateConvert: any = localDate.split('/');
        return dateConvert[0]+'/'+dateConvert[1];
    }

    public convertSplitLocalToUtc(localDate: string):string {
        if(localDate != null && localDate != '') {
            const dateConvert: any = localDate.split('/');
            return (dateConvert[2]-543)+'-'+dateConvert[1]+'-'+dateConvert[0];
        }
      
        return '';
    }

    public convertSplitDateToUtc(localDate: string):string {
        const dateConvert: any = localDate.split('/');
        return (dateConvert[2])+'-'+dateConvert[1]+'-'+dateConvert[0];
    }

    public convertSplitDateUtcTolocal2(localDate: string):string {
        const dateConvert: any = localDate.split('-');
        return (dateConvert[2])+'/'+dateConvert[1]+'/'+dateConvert[0];
    }

    public convertSplitUtc(localDate: string):string {
        const dateConvert: any = localDate.split('T');
        return dateConvert[0];
    }

    public convertSplitTimeUtc(localDate: string):string {
        const dateConvert: any = localDate.split('T');
        return dateConvert[1];
    }


}