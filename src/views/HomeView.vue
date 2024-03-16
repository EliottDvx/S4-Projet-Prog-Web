<script setup>
import Favs from '@/components/Favs.vue';

import { ref } from 'vue';

const selectedTimeRange = ref('medium_term');

</script>

<template>
  <main>
    <h1>Main board</h1>
    <select v-model="selectedTimeRange">
      <option value="short_term">Short term (4 weeks)</option>
      <option value="medium_term" selected="selected">Medium term (6 months)</option>
      <option value="long_term">Long term (Several years)</option>
    </select>
    <Favs :range="selectedTimeRange" />
  </main>
</template>