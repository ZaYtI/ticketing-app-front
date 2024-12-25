<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-gray-500 text-left rtl:text-right">
      <thead class="bg-gray-50 text-xs text-gray-700 uppercase">
        <tr>
          <th v-for="key in columnKeys" :key="key" class="px-6 py-3">
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
          v-for="(element, index) in props.data"
          :key="index"
          class="border-b odd:bg-white even:bg-gray-50"
        >
          <td v-for="(value, key) in element" :key="key" class="px-6 py-4">
            <template v-if="key.toString() === 'status'">
              <DashboardEnumCell :key-type="key.toString()" :value="+value" />
            </template>
            <template v-else-if="key.toString() === 'changedBy'">
              <span v-if="value && value.email">{{ value.email }}</span>
              <span v-else>Utilisateur inconnu</span>
            </template>
            <template v-else>
              {{ value }}
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import type { StatusHistory } from "~/utils/interface/Tickets";

const props = defineProps({
  data: {
    type: Array as () => StatusHistory[],
    required: true,
  },
  columnKeys: {
    type: Array as () => string[],
    required: true,
  },
});
</script>
