<template>
  <CardContainer class="mb-3" v-if="data">
    <div class="grid grid-cols-2 gap-6">
      <ChartDynamicChart
        v-if="ticketsByStatus.length != 0"
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
        v-if="ticket12LastMonths.length != 0"
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
  <DashboardTable
    :query-function="tickets.getAllTicket"
    title="Liste de vos tickets"
    query-key="tickets"
    :modal-field="addTicketField"
    :modal-function="tickets.create"
  />
</template>

<script lang="ts" setup>
import { useQuery } from "@tanstack/vue-query";
import { useAuthStore } from "~/stores/auth";
import { Status } from "~/utils/enum/Status";
import type { FormKitProps } from "~/utils/interface/FormKitProps";

const tickets = useTickets();
const authStore = useAuthStore();

const { data } = useQuery({
  queryKey: ["ticket"],
  queryFn: () => tickets.getTicketChart(),
  retry: 1,
});

const ticketsByStatus = computed(() => {
  if (data.value) {
    return data.value.tickets_by_status.map((item) => ({
      name: Status[item.status],
      y: item.count,
    }));
  }
  return [];
});

const ticket12LastMonths = computed(() => {
  if (data.value) {
    return data.value.tickets_12_last_months.map((item) => ({
      m: item.m,
      count: item.count,
    }));
  }
  return [];
});

const addTicketField = computed(() => {
  const fields: FormKitProps[][] = [
  [
    {
      type: "text",
      name: "title",
      placeholder: "Entrez le titre du ticket",
      validation: "required",
      validationMessages: {
        required: "Le titre est requis",
      },
    },
  ],
  [
    {
      type: "select",
      name: "status",
      options: {
        1:'Ouvert',
        2:'En Attente',
        3:'Résolue',
        4:'Fermé'
      },
      validation: "required",
      validationMessages: {
        required: "Le statut est requis",
      },
    },
    {
      type: "select",
      name: "priority",
      options: {
        1:'Faible',
        2:'Moyenne',
        3:'Important'
      },
      validation: "required",
      validationMessages: {
        required: "La priorité est requise",
      },
    },
  ],
  [
    {
      type: "textarea",
      name: "description",
      placeholder: "Décrivez le problème",
      validation: "required",
      validationMessages: {
        required: "La description est requise",
      },
    },
  ],
  [
    {
      type: 'datetime-local',
      label: 'Date limite',
      name: 'dead_line',
      validation: 'date_after',  // Validation uniquement si la date est sélectionnée
      validationMessages: {
        date_after: 'La date doit être après la date actuelle.',
      },
      default: null,
    }
  ]
  ];

  if(authStore.isAdmin){
    //TODO: Ajouter les utilisateurs assignable
  }

  return fields
})
</script>
