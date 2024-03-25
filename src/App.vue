<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
</script>

<template>
  <Header v-if="$route.name != 'login' && $route.name != 'callback'" />
  <RouterView />
  <Footer v-if="$route.name != 'callback'" />
</template>

<style scoped>
@media (min-width: 1024px) {}
</style>
