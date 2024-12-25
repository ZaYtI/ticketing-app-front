<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { onMounted } from 'vue'
import { useFlowbite } from '~/composables/useFlowbite';

const auth = useAuth()

onMounted(async () => {
    useFlowbite(() => {
        initFlowbite();
    })
    await auth.checkAuth();
})
</script>
