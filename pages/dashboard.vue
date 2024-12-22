<template>
  <CardContainer class="mb-3" v-if="data">
    <div class="grid grid-cols-2 gap-6">
      <ChartDynamicChart
        v-if="ticketsByStatus.length!=0"
        type="pie"
        title="Répartition des tickets par status"
        :series="[
          {
            name: 'Nombres',
            colorByPoint: true,
            data: ticketsByStatus,
          },
        ]"
      />

      <ChartDynamicChart
        v-if="ticket12LastMonths.length!=0"
        type="line"
        title="Tickets créer par mois"
        :categories="[
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ]"
        :title_y_axis="'Tickets créés'"
        :series="[
          {
            name: 'Tickets',
            data: ticket12LastMonths.map((item) => item.count),
          },
        ]"
      />
    </div>
  </CardContainer>
  <DashboardTable :query-function="tickets.getAllTicket" title="Liste de vos tickets" query-key="tickets"/>
</template>

<script lang="ts" setup>
import { useQuery } from "@tanstack/vue-query";
import { Status } from "~/utils/enum/Status";

const tickets = useTickets();

const { data } = useQuery({
  queryKey: ["ticket"],
  queryFn: () => tickets.getTicketChart(),
  retry: 1,
});

const ticketsByStatus = computed(() => {
  if(data.value){
    return data.value.tickets_by_status.map((item) => ({
      name: Status[item.status],
      y: item.count
    }))
  }
  return [];
})

const ticket12LastMonths = computed(() => {
  if(data.value){
    return data.value.tickets_12_last_months.map((item) => ({
      m: item.m,
      count: item.count,
    }))
  } 
  return []
})
</script>
