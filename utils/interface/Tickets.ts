import type { User } from "./Users";

export interface StatusHistory{
    status:number;
    changedBy:{id:number,email:string}
}

export interface TicketData {
    id:number;
    title:string;
    status:number;
    priority:number;
    description:string;
    assign_to:User;
    created_by:User;
    dead_line:string|null;
    statusHistory?:StatusHistory[];
}
