export interface Shift{
    shiftId:string,
    description:string,
    mon:boolean,
    tue:boolean,
    wed:boolean,
    thu:boolean,
    fri:boolean,
    sat:boolean,
    sun:boolean,
    startTime:string,
    endTime:string,
    macId?:number
}