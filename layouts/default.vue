<script setup>
import { onMounted } from 'vue'
import { useFlowbite } from '~/composables/useFlowbite';

onMounted(() => {
    useFlowbite(() => {
        initFlowbite();
    })
})
</script>


<template>
  <div class="default-layout">
    <NavNavbar />
    <main class="default-layout-content p-4 sm:ml-64">
      <NavBreadCrumbs class=" p-2 mt-12"/>
      <div class="p-4">
        <slot />
      </div>  
    </main>
  </div>
</template>

<style>

*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.default-layout{
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.default-layout-content {
  flex-grow: 1;
}
</style>
