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
  categories?: string[];
  title_y_axis?: string;
}>();
const chartOptions = computed(() => {
  return {
    chart: {
      type: props.type,
    },
    title: {
      text: props.title,
    },
    xAxis: {
      categories: props.categories || [], 
    },
    yAxis: {
      title: {
        text: props.title_y_axis || '',
      },
    },
    series: props.series,
  };
});

</script>
