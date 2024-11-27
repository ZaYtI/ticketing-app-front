<template>
  <div :class="{'w-full':props.fullWidth}" class="p-4 border border-gray-200 rounded-lg shadow sm:p-8">
    <slot />
  </div>
</template>

<script lang="ts" setup>

const props = defineProps({
  fullWidth:{
    type:Boolean,
    default:true
  }
})

</script>
