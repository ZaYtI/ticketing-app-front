<template>
  <div>
      <span v-if="isPending">Loading...</span>
      <DashboardTable v-if="data" :data="data" />
      <span v-if="isError">Il y a une erreur durant la récupération des données</span>
  </div>
</template>


<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query'
import { getAllUser } from '~/composables/user';

const { isPending, isError, data } = useQuery({
  queryKey: ['users'],
  queryFn: () => getAllUser(),
  retry:1
})

</script>
