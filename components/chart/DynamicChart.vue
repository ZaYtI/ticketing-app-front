<template>
  <div>
    <highcharts :options="chartOptions" />
  </div>
</template>

<script lang="ts" setup>

interface Series {
  name: string;
  colorByPoint?: boolean;
  data: Array<number | { name: string; y: number }>;
}

const props = defineProps<{
  series: Series[];
  type?: string;
  title?: string;
}>();

const chartOptions = computed(() => {
  return {
    chart: {
      type: props.type, // props est directement accessible
    },
    title: {
      text: props.title,
    },
    series: props.series,
  };
});

</script>
