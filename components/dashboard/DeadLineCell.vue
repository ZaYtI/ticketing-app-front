<template>
  <span
    :class="{
      'font-medium bg-red-600 px-2 py-1 rounded-lg text-white': value && !props.noColor,
      'text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded-lg': !value || props.noColor,
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
  noColor:{
    type:Boolean,
    default:false,
  }
});

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("fr-FR", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
</script>
