import { Uleave } from 'src/app/core/models/uleave.model';
import { Employee } from 'src/app/core/models/employee.model';
export interface LeaveOpening{
    leaveOpeningId:string,
    employee?:Employee,
    leave?:Uleave,
    dayCount:number,
    openingDate:string,
    macId:number
}