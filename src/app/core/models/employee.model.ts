import { City } from "./city.model";
import { Gender } from "./gender.model";

export interface Employee{
    employeeId:string,
    description:string,
    remark:string,
    phoneNo:string,
    address:string,
    email:string,
    photoPath:string,
    active:boolean,
    macId:number,
    city?:City,
    gender?:Gender
}