import type { IPaginatedResponse } from "~/utils/interface/paginated";
import type { TicketData } from "~/utils/interface/Tickets";

export async function getAllTicket(
    limit = 10,
    page = 1

): Promise<IPaginatedResponse<TicketData>> {
    const params = new URLSearchParams({
        limit: String(limit),
        page: String(page),
    });

    const response = await $fetch<IPaginatedResponse<TicketData>>(
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
