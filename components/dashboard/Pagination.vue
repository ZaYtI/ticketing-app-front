<template>
  <div class="flex py-3 px-2 text-xs justify-between">
    <PaginationItemPerPages :max-select="props.maxSelect" :steps="props.steps" />
    <div class="flex items-center">
      <PaginationButton :rowDirection="RowDirectionButton.LEFT" />
      <span>
        {{ props.meta.current_page }} of {{ props.meta.total_pages }}
      </span>
      <PaginationButton :rowDirection="RowDirectionButton.RIGHT" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RowDirectionButton } from "~/utils/enum/RowDIrectionButton";
import type { PaginatedMeta } from "~/utils/interface/paginated";

const props = defineProps({
  meta: {
    type: Object as () => PaginatedMeta,
    required: true,
  },
  maxSelect: {
    type: Number,
    default: 50,
  },
  steps: {
    type: Number,
    default: 10,
  },
});
</script>
