import type { IPaginatedResponse } from "~/utils/interface/paginated";
import type { TicketData } from "~/utils/interface/Tickets";

export async function getAllTicket(
    filters: Record<string, any> = {},
    page = 1
): Promise<IPaginatedResponse<TicketData>> {
    const params = new URLSearchParams({
        ...filters,
        page: String(page),
    });

    const response = await $fetch<IPaginatedResponse<TicketData>>(
        `http://localhost:8000/api/ticket?${params}`,
        {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MzI3MTM2NzUsImV4cCI6MTczMjcxNzI3NSwianRpIjoiMWNiYWY2NTBmNjcwYzMxZmQzNmM0Yjk5ZGRkMDM1MDUiLCJyb2xlcyI6WyJST0xFX1VTRVIiXSwidXNlcm5hbWUiOiJ1cmV5QGJsb3QuY29tIn0.Jjnd90MhZexqbeNhOq8A3N7FhryM-b1e9lrdNBK5t7dIcox5HWcXLSF50poOjrgTaOumdwrNu3sHpCjBN_SQOjVmZ5x2HnsCcTaw0EmkRD7RFK3RceuKmdfdEi0yCy_ctOv3ZW_s1YDIhgw4EimBR3NDPP_AqykvcuuwQRCODtGj4WbLlYyEZTDQLloYAR2DHtPcqVNtVojdS7qYb4v-WlfXB-SdPcD-_6XGsnYlIqCtd38nVY8EtenUmZsD2ui42Nz0b5flbpCjd1RLeZPXMMnTx672ZtN2Bq1K36iKMUE7CvV4FsMIm-QRtGl1vcYUnZGTqF797HZYA61m-lTA8A'
            },
        }
    );

    return response;
}
