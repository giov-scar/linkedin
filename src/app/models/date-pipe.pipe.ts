import { Pipe, PipeTransform } from '@angular/core';
import {DatePipe} from "@angular/common";

@Pipe({
  name: 'datePipe'
})
export class DatePipePipe implements PipeTransform {

  transform(value: any, format: string = 'yyyy-MM-dd HH:mm:ss'):any {
  const datePipe = new DatePipe('en-US');
  return datePipe.transform(value, format);
}

}
