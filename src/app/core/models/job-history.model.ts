import { Employee } from "./employee.model";
import { Job } from "./job.model";

export interface JobHistory{
    jobHisId:string,
    job?:Job,
    employee?:Employee,
    startDate:string,
    endDate:string,
    remark:string,
    macId:number
}