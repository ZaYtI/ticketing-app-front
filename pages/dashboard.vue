<template>
    <div class="mt-0">
        <DashboardTable :column-title="columnTitle" />
    </div>
</template>

<script lang="ts" setup>

const ticketsData = {
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

const columnTitle = [
    "Product name",
    "Color",
    "Category",
    "Price",
    "Action"
]

</script>
