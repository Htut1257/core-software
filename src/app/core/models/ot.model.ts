import { Job } from "./job.model";
export interface Ot{
    otId:string,
    description:string,
    otMin:number,
    amount:number,
    active:boolean,
    macId:number,
    job?:Job
}