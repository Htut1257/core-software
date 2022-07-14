import { Employee } from "./employee.model";
import { Uleave } from "./uleave.model";

export interface LeaveHistory{
    leaveHisId:string,
    leave?:Uleave,
    employee?:Employee,
    startDate:string,
    endDate:string,
    remark:string,
    macId:number
}