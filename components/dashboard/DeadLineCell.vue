<template>
  <span
    :class="{
      'font-medium bg-red-600 px-2 py-1 rounded-lg text-white': value,
      'text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded-lg': !value,
    }"
  >
    {{ value ? formatDate(value) : "non défini" }}
  </span>
</template>

<script lang="ts" setup>
const props = defineProps({
  value: {
    type: String,
    required: false,
  },
});

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("fr-FR", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
</script>
