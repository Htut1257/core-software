import { Payday } from "./payday.model";

export interface Job{
    jobId:string,
    description:string,
    salary?:number,
    active:boolean,
    macId:number,
    payDay?:Payday, 
}