<template>
    <div class="mt-0">
        <DashboardTable :data="ticketsData" />
    </div>
</template>

<script lang="ts" setup>
import type { IPaginatedResponse } from '~/utils/interface/paginated';
import type { TicketData } from '~/utils/interface/Tickets';


const ticketsData:IPaginatedResponse<TicketData> = {
    items: [
        {
            id: 50,
            title: "Pr.",
            status: 4,
            priority: 1,
            dead_line: "2024-11-17T19:13:39+00:00"
        },
        {
            id: 57,
            title: "nouveau tets fzefzef",
            status: 1,
            priority: 3,
            dead_line: null
        },
        {
            id: 58,
            title: "nouveau tets fzeffzefezfzef",
            status: 1,
            priority: 3,
            dead_line: null
        },
        {
            id: 59,
            title: "nouveau tefezfzefzts fzeffzefezfzef",
            status: 1,
            priority: 3,
            dead_line: null
        }
    ],
    meta: {
        total_items: 4,
        current_page: 1,
        total_pages: 1,
        next_pages: null
    }
}

</script>
