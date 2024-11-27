<template>
  <button type="button" class="pagination-button">
    <svg
      :class="['w-3.5 h-3.5 rtl:rotate-180', rowDirectionClass]"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 14 10"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1"
        :d="rowDirectionD"
      />
    </svg>
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import type { PropType } from 'vue';
import { RowDirectionButton } from '~/utils/enum/RowDIrectionButton';

const props = defineProps({
  rowDirection: {
    type: Number as PropType<RowDirectionButton>,
    default: RowDirectionButton.RIGHT,
  },
});

const rowDirectionD = computed(() => {
  return props.rowDirection === RowDirectionButton.LEFT
    ? "M13 5H1m0 0 4 4M1 5l4-4" 
    : "M1 5h12m0 0L9 1m4 4L9 9"; 
});

const rowDirectionClass = computed(() => {
  return props.rowDirection === RowDirectionButton.LEFT ? 'me-2' : 'ms-2';
});
</script>
