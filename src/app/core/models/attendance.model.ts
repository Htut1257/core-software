import { Employee } from "./employee.model";

export interface Attendance{
    attendanceId:string,
    employee:Employee,
    attendanceDate:string,
    startTime:string,
    endTime:string,
    macId:number
}