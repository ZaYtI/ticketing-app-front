<template>
  <div>
      <DashboardPaginatedTable :query-function="getAllUser" title="Liste des utilisateurs de l'application" query-key="users" />
  </div>
</template>


<script lang="ts" setup>
import { getAllUser } from '~/composables/user';
</script>
