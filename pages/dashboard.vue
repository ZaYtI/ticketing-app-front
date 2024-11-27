<template>
    <div>
        <span v-if="isPending">Loading...</span>
        <DashboardTable v-else :data="data" />
    </div>
</template>

<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query'
import { getAllTicket } from '~/composable/ticket';

const { isPending, isError, data } = useQuery({
    queryKey: ['tickets'],
    queryFn: () => getAllTicket(),
    retry:1
})

</script>
