<template>
    <div>
        <span v-if="isPending">Loading...</span>
        <DashboardTable v-if="data" :data="data" />
        <span v-if="isError">Il y a une erreur durant la récupération des données</span>
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
