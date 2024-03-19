<script setup>
import FavTracks from '@/components/FavTracks.vue';

import { ref } from 'vue';

const selectedTimeRange = ref('medium_term');

</script>

<template>
  <main>
    <h1>Your Profile Main Board</h1>
    <select v-model="selectedTimeRange">
      <option value="short_term">Short term (4 weeks)</option>
      <option value="medium_term" selected="selected">Medium term (6 months)</option>
      <option value="long_term">Long term (Several years)</option>
    </select>
    <FavTracks :range="selectedTimeRange" />
  </main>
</template>