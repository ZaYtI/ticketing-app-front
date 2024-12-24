<template>
  <CardContainer>
    <h1 class="text-2xl">{{ title }}</h1>
    <div v-if="isPending">Chargement...</div>
    <div v-if="data">
      <div class="flex flex-row-reverse p-2">
        <button
          type="button"
          class="btn-gradient"
        >
          + Ajouter
        </button>
      </div>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-gray-500 text-left rtl:text-right">
          <thead class="bg-gray-50 text-xs text-gray-700 uppercase">
            <tr>
              <th
                v-for="key in columnKeys"
                :key="key"
                class="px-6 py-3"
              >
                <div class="flex items-center">
                  {{ key }}
                  <button class="ml-1.5">
                    <svg
                      class="w-3 h-3"
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
              class="border-b odd:bg-white even:bg-gray-50"
            >
              <td
                v-for="(value, key) in element"
                :key="key"
                class="px-6 py-4"
              >
                <template v-if="key.toString() === 'dead_line'">
                  <DashboardDeadLineCell :value="value" />
                </template>
                <template v-else-if="key.toString() === 'priority' || key.toString() === 'status'">
                  <DashboardEnumCell :key-type="key.toString()" :value="value" />
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
        :meta="data.meta"
        @page-change="handlePageChange"
        @items-per-page-change="handleItemsPerPageChange"
        :current-items-per-page="pageSize"
      />
    </div>
  </CardContainer>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useQuery, keepPreviousData } from "@tanstack/vue-query";

const props = defineProps({
  queryFunction: {
    type: Function,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  queryKey: {
    type: String,
    required: true,
  },
});

const currentPage = ref(1);
const pageSize = ref(10);

const { isPending, data } = useQuery({
  queryKey: [props.queryKey, currentPage, pageSize],
  queryFn: () => props.queryFunction(pageSize.value, currentPage.value),
  retry: 1,
  placeholderData: keepPreviousData,
});

const columnKeys = computed(() =>
  data.value?.items?.length ? Object.keys(data.value.items[0]) : []
);

const handlePageChange = (newPage: number) => {
  currentPage.value = newPage;
};

const handleItemsPerPageChange = (newItemsPerPage: number) => {
  pageSize.value = newItemsPerPage;
};
</script>

<style scoped>
.btn-gradient {
  @apply text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 font-medium rounded-lg text-sm px-5 py-2.5;
}
</style>
