import { Pipe, PipeTransform } from '@angular/core';
import { Shift } from 'src/app/core/models/shift.model';

export const DayColumn = [
  {
    key: 'mon',
    value: 'Monday'
  },
  {
    key: 'tue',
    value: 'TuesDay'
  },
  {
    key: 'wed',
    value: 'Wednesday'
  },
  {
    key: 'thu',
    value: 'Thursday'
  },
  {
    key: 'fri',
    value: 'Friday'
  },
  {
    key: 'sat',
    value: 'Saturday'
  },
  {
    key: 'sun',
    value: 'Sunday'
  },
]

@Pipe({
  name: 'day'
})

export class DayPipe implements PipeTransform {

  // transform(value: number, exponent = 1): number {
  //   return Math.pow(value, exponent);
  // }

  transform(value: Shift): unknown {
    //Columns.map((col)=>col.key)
    //let header=DayColumn.map(data=>data.key)
    // let header=Object.keys(DayColumn)
    let header = this.getDay(value)
    return header;
  }

  getDay(shift: Shift): string {
    let dayString = ''
    for (var i = 0; i < DayColumn.length; i++) {
      let dayName = DayColumn[i].key.toString()

      switch (dayName) {
        case 'mon': {
          if (shift.mon) {
            if (dayString != '') {
              dayString += ','
            }
            dayString += DayColumn[i].value
          }
          break;
        }
        case 'tue': {
          if (shift.tue) {
            if (dayString != '') {
              dayString += ','
            }
            dayString += DayColumn[i].value
          }
          break;
        }
        case 'wed': {
          if (shift.wed) {
            if (dayString != '') {
              dayString += ','
            }
            dayString += DayColumn[i].value
          }
          break;
        }
        case 'thu': {
          if (shift.thu) {
            if (dayString != '') {
              dayString += ','
            }
            dayString += DayColumn[i].value
          }
          break;
        }
        case 'fri': {
          if (shift.fri) {
            if (dayString != '') {
              dayString += ','
            }
            dayString += DayColumn[i].value
          }
          break;
        }
        case 'sat': {
          if (shift.sat) {
            if (dayString != '') {
              dayString += ','
            }
            dayString += DayColumn[i].value
          }
          break;
        }
        case 'sun': {
          if (shift.sun) {
            if (dayString != '') {
              dayString += ','
            }
            dayString += DayColumn[i].value
          }
          break;
        }
      }
    }
    return dayString;
  }


}
