<template>
    <CardContainer class="mb-3">

        <h1>Graphiques avec Highcharts</h1>
    <div class="flex justify-around grid grid-cols-2 gap-6">
  
      <ChartDynamicChart
        :type="'pie'"
        :title="'Répartition des tickets par status'"
        :series="[
          {
            name: 'Nombres',
            colorByPoint: true,
            data: ticketsByStatus,
          },
        ]"
      />

      <ChartDynamicChart
                :type="'line'"
                :title="`Tickets créés sur l'année courante`"
                :categories="[
                    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                ]"
                :title_y_axis="'Tickets créés'"
                :series="[
                    {
                        name: 'Tickets',
                        data: ticket12LastMonths.map(item => item.count),
                    },
                ]"
            />
      
      </div>
    </CardContainer>

    <DashboardTable/>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { getTicketChart } from "~/composables/ticket";

interface TicketStatusData {
  name: string;
  y: number;
}
interface Ticket12LastMonthsData {
    m: number;
    count: number;
}

const ticketsByStatus = ref<TicketStatusData[]>([]);
const ticket12LastMonths = ref<Ticket12LastMonthsData[]>([]);

onMounted(async () => {
  try {
    const chartData = await getTicketChart();

    ticketsByStatus.value = chartData.tickets_by_status.map((item) => ({
      name: `Statut : ${item.status}`,
      y: item.count}));

        // Tickets sur 12 derniers mois
        ticket12LastMonths.value = chartData.tickets_12_last_months.map((item) => ({
            m: item.m,
            count: item.count
        }));
  } catch (error) {
    console.error("Erreur lors de la récupération des données : ", error);
  }
});
</script>