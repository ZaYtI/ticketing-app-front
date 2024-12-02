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
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
        'Oct', 'Nov', 'Dec'
      ]"
      :title_y-axis="'Tickets créés'"
      :series="[
        {
          name: 'Reggane',
          data: [
            16.0, 18.2, 23.1, 27.9, 32.2, 36.4, 39.8, 38.4, 35.5, 29.2,
            22.0, 17.8
          ],
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

const ticketsByStatus = ref<TicketStatusData[]>([]);

onMounted(async () => {
  try {
    const chartData = await getTicketChart();

    ticketsByStatus.value = chartData.tickets_by_status.map((item) => ({
      name: `Statut : ${item.status}`,
      y: item.count,
    }));
  } catch (error) {
    console.error("Erreur lors de la récupération des données : ", error);
  }
});
</script>