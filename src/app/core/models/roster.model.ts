import { Shift } from "./shift.model";

export interface Roster{
    rosterId:string,
    startDate:string,
    endDate:string,
    shift?:Shift,
    remark:string,
    userId:string,
    macId:number,
    employee?:[]
    listRosterDetails?:[]
}

export interface RosterDetail{
    rosterDetailId:string,
    rosterId:string,
    employeeId:string,
    uniqueId:string
}