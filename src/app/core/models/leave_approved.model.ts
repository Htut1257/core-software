import { LeaveHistory } from "./leave-history.model";

export interface LeaveApproved{
    leaveApprovedId:string,
    leaveHis?:LeaveHistory,
    approvedDate:string,
    approvedStatus:boolean,
    userId:string,
    macId:number
}