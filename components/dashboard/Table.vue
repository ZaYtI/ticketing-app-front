<template>
  <CardContainer>
    <div class="flex justify-between p-3">
      <h1 class="text-2xl p-2">Liste de vos tickets</h1>
      <button
        type="button"
        class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 white:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        + Ajouter
      </button>
    </div>

    <div v-if="isPending">Loading...</div>
    <div v-if="isError">Il y a une erreur durant la récupération des données</div>

    <div v-if="data" class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 white:text-gray-400"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 white:bg-gray-700 white:text-gray-400"
        >
          <tr>
            <th
              v-for="key of columnKeys"
              :key="key"
              scope="col"
              class="px-6 py-3"
            >
              <div class="flex items-center">
                {{ key }}
                <button>
                  <svg
                    class="w-3 h-3 ms-1.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"
                    />
                  </svg>
                </button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(element, index) in data.items"
            :key="index"
            class="odd:bg-white odd:white:bg-gray-900 even:bg-gray-50 even:white:bg-gray-800 border-b white:border-gray-700"
          >
            <td
              v-for="(value, key) in element"
              :key="key"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap white:text-white"
            >
              <template v-if="key === 'dead_line'">
                <span
                  :class="{
                    'font-medium bg-red-600 px-2 py-1 rounded-lg text-white':
                      value != null && key === 'dead_line',
                    'text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded-lg':
                      value == null,
                  }"
                >
                  {{ value || "non défini" }}
                </span>
              </template>
              <template v-else>
                {{ value }}
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <DashboardPagination
      v-if="data"
      :meta="data.meta"
      @page-change="handlePageChange"
      @items-per-page-change="handleItemsPerPageChange"
      :current-items-per-page="pageSize"
    />
  </CardContainer>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { getAllTicket } from '~/composables/ticket';

const currentPage = ref(1);
const pageSize = ref(10);

const { 
  isPending, 
  isError, 
  data 
} = useQuery({
  queryKey: ['tickets', currentPage, pageSize],
  queryFn: () => getAllTicket(pageSize.value, currentPage.value),
  retry: 1
});

const columnKeys = computed(() => {
  return data.value?.items?.length > 0 
    ? Object.keys(data.value.items[0]) 
    : [];
});

const handlePageChange = (newPage: number) => {
  currentPage.value = newPage;
};

const handleItemsPerPageChange = (newItemsPerPage: number) => {
  pageSize.value = newItemsPerPage;
};
</script>
