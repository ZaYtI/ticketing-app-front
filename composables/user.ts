import type { PaginatedResponse } from "~/utils/interface/paginated";
import type { User } from "~/utils/interface/Users";

export async function getAllUser(): Promise<PaginatedResponse<User>> {
    const response = await $fetch<PaginatedResponse<User>>(
        `http://localhost:8000/api/user`,
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
