<template>
  <div>
    <span class="p-1 text-white rounded" :style="{ backgroundColor: colors }">
      {{ getRoleLabel }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { Roles } from "~/utils/enum/Roles";

const props = defineProps({
  value: {
    type: String,
    required: false,
  },
});

const colors = computed(() => {
  switch (props.value) {
    case "ROLE_ADMIN":
      return "#FF0000";
    case "ROLE_SUPPORT":
      return "#2A9134";
    default:
      return "#6B7280";
  }
});

const getRoleLabel = computed(() => {
  if (props.value && props.value in Roles) {
    return Roles[props.value as keyof typeof Roles];
  }
  return "N/A";
});
</script>
