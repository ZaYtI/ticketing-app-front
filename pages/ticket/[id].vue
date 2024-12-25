<template>
  <div class="grid grid-cols-12 gap-6 min-h-screen">
    <CardContainer class="col-span-12 md:col-span-7 p-4 h-full">
      <div class="flex justify-between">
        <h2 class="text-xl font-semibold mb-4">Détails du Ticket</h2>

        <button
          @click="openModal"
          class="flex items-center p-2 text-gray-900 rounded-lg white:text-white hover:bg-gray-100 white:hover:bg-gray-700 group"
        >
          <svg
            class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 white:text-gray-400 group-hover:text-gray-900 white:group-hover:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"
            />
            <path
              d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z"
            />
            <path
              d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z"
            />
          </svg>
        </button>
      </div>

      <div v-if="data">
        <div class="bg-white shadow-lg rounded-lg p-4 mb-4">
          <strong class="block font-medium text-gray-700">Titre:</strong>
          <p>{{ data.title }}</p>
        </div>
        <div class="bg-white shadow-lg rounded-lg p-4 mb-4">
          <strong class="block font-medium text-gray-700">Description:</strong>
          <p>{{ data.description }}</p>
        </div>
        <div class="bg-white shadow-lg rounded-lg p-4 mb-4" v-if="data.dead_line">
          <strong class="block font-medium text-gray-700">Date limite:</strong>
          <DashboardDeadLineCell :value="data.dead_line" />
        </div>
        <div class="bg-white shadow-lg rounded-lg p-4 mb-4">
          <strong class="block font-medium text-gray-700">Status:</strong>
          <DashboardEnumCell key-type="status" :value="data.status" />
        </div>
        <div class="bg-white shadow-lg rounded-lg p-4 mb-4">
          <strong class="block font-medium text-gray-700">Priorité:</strong>
          <DashboardEnumCell key-type="priority" :value="data.priority" />
        </div>
        <div class="bg-white shadow-lg rounded-lg p-4 mb-4">
          <strong class="block font-medium text-gray-700">Assigné à:</strong>
          <a
            v-if="data.assign_to != null"
            class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            :href="'mailto:' + data.assign_to.email"
            >{{ data?.assign_to.email }}</a
          >
          <span v-else class="text-xs text-gray-400"
            >Le ticket n'est pas encore assginer</span
          >
        </div>
        <div class="bg-white shadow-lg rounded-lg p-4 mb-4">
          <strong class="block font-medium text-gray-700">Créer par:</strong>
          <a
            v-if="data.created_by != null"
            class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            :href="'mailto:' + data.created_by.email"
            >{{ data?.created_by.email }}</a
          >
        </div>
      </div>
    </CardContainer>

    <DashboardModal
      v-if="data"
      @close-modal="closeModal"
      modal-title="Modifier le ticket"
      modal-id="update-ticket"
      :is-modal-open="isModalOpen"
      :fields="updateTicketField"
      :modal-function="tickets.update"
    >
    <FormKit
        v-if="authStore.isAdmin && assignableUsers.length > 0"
        type="select"
        name="assigned_to_user_id"
        placeholder="Assigner le ticket"
        :options="assignableUsers"
        :classes="{
          input:
            'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
          messages: 'text-red-600 text-xs',
          label: 'text-gray-500 text-sm font-normal text-left',
        }"
      />
    </DashboardModal>

    <CardContainer
      class="col-span-12 md:col-span-5 p-4 shadow-md rounded-lg h-full"
    >
      <TableInfo :data="statusHistoryData" :columnKeys="columnKeys" />
    </CardContainer>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { useRoute } from "vue-router";
import type { FormKitProps } from "~/utils/interface/FormKitProps";
import { useAuthStore } from "~/stores/auth";
import { useTickets } from "~/composables/ticket";

const route = useRoute();
const tickets = useTickets();
const isModalOpen = ref(false);
const authStore = useAuthStore()

const { data } = useQuery({
  queryKey: ["ticket-details", route.params.id],
  queryFn: () => tickets.getTicketDetails(+route.params.id),
  retry: 1,
});

const updateTicketField = ref<FormKitProps[][]>([
  [
    {
      type: "text",
      name: "title",
      placeholder: "Entrez le titre du ticket",
    },
  ],
  [
    {
      type: "select",
      name: "status",
      options: {
        1: "Ouvert",
        2: "En Attente",
        3: "Résolue",
        4: "Fermé",
      },
      placeholder: "Status",
    },
    {
      type: "select",
      name: "priority",
      options: {
        1: "Faible",
        2: "Moyenne",
        3: "Important",
      },
      placeholder: "Priorité",
    },
  ],
  [
    {
      type: "textarea",
      name: "description",
      placeholder: "Décrivez le problème",
    },
  ],
  [
    {
      type: "datetime-local",
      label: "Date limite",
      name: "dead_line",
    },
  ],
]);

const assignableUsers = ref<any[]>([]);

onMounted(async () => {
  const users = await tickets.getAssignableUser();
  assignableUsers.value = users.map(user => ({
    label: user.email,
    value: user.id.toString(),
  }));
});

function openModal() {
  isModalOpen.value = true;
}

function closeModal() {
  console.log("close modal");
  isModalOpen.value = false;
}

const statusHistoryData = computed(() => {
  return data.value?.statusHistory || [];
});

const columnKeys = computed(() =>
  statusHistoryData.value.length ? Object.keys(statusHistoryData.value[0]) : []
);
</script>
