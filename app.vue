<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { onMounted } from 'vue'
import { useFlowbite } from '~/composables/useFlowbite';

const auth = useAuth();

onMounted(() => {
    useFlowbite(() => {
        initFlowbite();
    })
    auth.checkAuth()
})
</script>
