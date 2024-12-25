<template>
  <span
    :style="{
      backgroundColor: value != null ? getColor(keyType, value) : '#F3F4F6',
      color: value != null ? '#FFFFFF' : '#6B7280',
    }"
    class="font-medium px-2 py-1 rounded-lg"
  >
    {{ value != null ? getValueFromEnum(keyType, value) : "non défini" }}
  </span>
</template>

<script lang="ts" setup>
import { Priority } from "~/utils/enum/Priority";
import { Status } from "~/utils/enum/Status";

const props = defineProps({
  keyType: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: false,
  },
});

function getColor(key: string, value: number) {
  switch (key) {
    case "priority":
      switch (value) {
        case 1:
          return "#2A9134";
        case 2:
          return "#FFD400";
        case 3:
          return "#FF0000";
        default:
          return "#6B7280";
      }
    case "status":
      switch (value) {
        case 1:
          return "#2A9134";
        case 2:
          return "#FFD400";
        case 4:
          return "#FF0000";
        default:
          return "#6B7280";
      }
    default:
      return "#6B7280";
  }
}

function getValueFromEnum(key: string, value: number) {
  switch (key) {
    case "priority":
      return Priority[value] || "Inconnu";
    case "status":
      return Status[value] || "Inconnu";
    default:
      return "Inconnu";
  }
}
</script>

<style scoped>
/* Styles supplémentaires si nécessaire */
</style>
