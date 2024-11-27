<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { onMounted } from 'vue'
import { useFlowbite } from '~/composables/useFlowbite';

onMounted(() => {
    useFlowbite(() => {
        initFlowbite();
    })
})
</script>
