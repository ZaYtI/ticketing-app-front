<template>
  <div class="flex justify-center items-center">
    <span >item per pages</span>
    <form class="ms-2">
      <select
        id="item_per_page"
        class="block text-xs text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 p-0 m-0 w-13 h-6"
      >
        <option
          v-for="option in options"
          :key="option"
          :value="option"
          :selected="option === 10"
        >
          {{ option }}
        </option>
      </select>
    </form>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps({
  maxSelect: {
    type: Number,
    required:true
  },
  steps: {
    type: Number,
    required:true
  },
});

const options = computed(() => {
  const result = [];
  for (let i = props.steps; i <= props.maxSelect; i += props.steps) {
    result.push(i);
  }
  return result;
});

</script>

<style></style>
