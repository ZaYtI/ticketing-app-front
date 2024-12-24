<template>
  <div class="flex gap-1">
    <DashboardRoleSpan v-for="val in props.value" :value="val" />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  value: {
    type: String,
    required: false,
  },
});

console.log(props.value)
</script>
