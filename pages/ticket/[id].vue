<template>
  <div class="grid grid-cols-12 gap-6 min-h-screen">
    <!-- Section Gauche : Affichage des détails du ticket -->
    <CardContainer class="col-span-12 md:col-span-7 p-4 h-full">
      <h2 class="text-xl font-semibold mb-4">Détails du Ticket</h2>
      
      <!-- Vérifier si les données sont disponibles et les afficher -->
      <div v-if="ticketDetails">
        <div class="bg-white shadow-lg rounded-lg p-4 mb-4">
          <strong class="block font-medium text-gray-700">Titre:</strong>
          <p>{{ ticketDetails.title }}</p>
        </div>

        <div class="bg-white shadow-lg rounded-lg p-4 mb-4">
          <strong class="block font-medium text-gray-700">Description:</strong>
          <p>{{ ticketDetails.description }}</p>
        </div>

        <div class="bg-white shadow-lg rounded-lg p-4 mb-4">
          <strong class="block font-medium text-gray-700">Status:</strong>
          <DashboardEnumCell key-type="status" :value="ticketDetails.status" />
        </div>

        <div class="bg-white shadow-lg rounded-lg p-4 mb-4">
          <strong class="block font-medium text-gray-700">Assigné à:</strong>
          <p>{{ ticketDetails.assigner_to.email }}</p>
        </div>

      </div>
    </CardContainer>

    <!-- Section Droite : Tableau de l'historique des statuts -->
    <CardContainer class="col-span-12 md:col-span-5 p-4 shadow-md rounded-lg h-full">
      <TableInfo :data="statusHistoryData" :columnKeys="columnKeys" />
    </CardContainer>
  </div>
</template>

<script lang="ts" setup>
import { useQuery } from "@tanstack/vue-query";
import { useRoute } from "vue-router";
import { computed } from "vue";

const tickets = useTickets();
const route = useRoute();

// Récupérer les données du ticket depuis l'API
const { data, isPending } = useQuery({
  queryKey: ["ticket-details", route.params.id],
  queryFn: () => tickets.getTicketDetails(+route.params.id),
  retry: 1,
});

// Extraction des informations générales du ticket
const ticketDetails = computed(() => {
  return data.value ? {
    title: data.value.title,
    description: data.value.description,
    status: data.value.status,
    assigner_to: data.value.assigner_to,
  } : null;
});

// Extraction de l'historique des statuts
const statusHistoryData = computed(() => {
  return data.value?.statusHistory || [];
});

// Colonnes du tableau de l'historique des statuts
const columnKeys = computed(() =>
  statusHistoryData.value.length ? Object.keys(statusHistoryData.value[0]) : []
);
</script>
