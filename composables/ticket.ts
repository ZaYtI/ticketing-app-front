import type { PaginatedResponse } from "~/utils/interface/paginated";
import type { TicketData } from "~/utils/interface/Tickets";
import type { ChartInfo } from "~/utils/interface/ChartInfo";
import type { User } from "~/utils/interface/Users";


export function useTickets(){
    const defaultLimit = 10;
    const defaultPages = 1;

    async function getAllTicket(
        limit = defaultLimit,
        page = defaultPages
    
    ): Promise<PaginatedResponse<TicketData>> {
        const params = new URLSearchParams({
            limit: String(limit),
            page: String(page),
        });
    
        const response = await $fetch<PaginatedResponse<TicketData>>(
            `http://localhost:8000/api/ticket?${params}`,
            {
                method: "GET",
                credentials:'include',
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    
        return response;
    }

    async function getTicketDetails(ticketId:number){
        const response = await $fetch<TicketData>(
            `http://localhost:8000/api/ticket/${ticketId}`,
            {
                method: "GET",
                credentials:'include',
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    
        return response;
    }

    async function getTicketChart(): Promise<ChartInfo> {
        const response = await $fetch<ChartInfo>(
            `http://localhost:8000/api/ticket/chart`,
            {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    
        return response;
    }

    async function getAssignableUser():Promise<User[]>{
        const response = await $fetch('http://localhost:8000/api/ticket/assignable',{
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
        })

        return response as User[]
    }

    const create = async(formData:FormData) =>{
        const response = await fetch('http://localhost:8000/api/ticket', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        return response;
    }

    return {
        getAllTicket,
        getTicketChart,
        create,
        getAssignableUser,
        getTicketDetails
    }
}
