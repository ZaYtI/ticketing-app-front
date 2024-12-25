<template>
  <div class="flex py-3 px-2 text-xs justify-between">
    <PaginationItemPerPages
      :max-select="props.maxSelect"
      :steps="props.steps"
      @items-per-page-change="handleItemsChange"
    />
    <div class="flex items-center">
      <PaginationButton
        :rowDirection="RowDirectionButton.LEFT"
        @click="changePage(-1)"
      />
      <span>
        {{ props.meta.current_page }} of {{ props.meta.total_pages }}
      </span>
      <PaginationButton
        :rowDirection="RowDirectionButton.RIGHT"
        @click="changePage(1)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RowDirectionButton } from "~/utils/enum/RowDIrectionButton";
import type { PaginatedMeta } from "~/utils/interface/paginated";

const emit = defineEmits(["page-change", "items-per-page-change"]);

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

const changePage = (direction: number) => {
  const newPage = props.meta.current_page + direction;
  if (newPage > 0 && newPage <= props.meta.total_pages) {
    emit("page-change", newPage);
  }
};

const handleItemsChange = (newItemsNumber:number) => {
  emit('items-per-page-change',newItemsNumber)
}
</script>
