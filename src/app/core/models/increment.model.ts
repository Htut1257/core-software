import { Job } from "./job.model";

export interface Increment{
    incrementId:string,
    description:string,
    amount:number,
    imonth:number,
    active:boolean,
    macId:number,
    job?:Job
}