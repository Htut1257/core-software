import { Department } from 'src/app/core/models/department.model';
import { Employee } from './employee.model';
export interface Department_History{
    deptHisId:string,
    department?:Department,
    employee?:Employee,
    startDate:string,
    endDate:string,
    remark:string,
    macId:number
}