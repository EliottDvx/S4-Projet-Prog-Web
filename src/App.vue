<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from '@/components/Header.vue';
</script>

<template>
  <div v-if="$route.name != 'login'">
    <Header />
  </div>
  <RouterView />
</template>

<style scoped>

@media (min-width: 1024px) {}
</style>
