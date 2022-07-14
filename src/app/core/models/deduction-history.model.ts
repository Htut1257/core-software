import { Employee } from 'src/app/core/models/employee.model';
import { Deduction } from "./deduction.model";

export interface DeductionHistory{
    deductionHisId:string,
    deduction?:Deduction,
    employee?:Employee,
    deductionDate:string,
    remark:string,
    amount:number,
    macId:number
}