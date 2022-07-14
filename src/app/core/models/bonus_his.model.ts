import { Employee } from './employee.model';
import { Bonus } from "./bonus.model";

export interface BonusHistory{
    bonusHisId:string,
    bonus?:Bonus,
    employee?:Employee,
    bonusDate:string,
    remark:string,
    amount:number,
    macId:number,
}