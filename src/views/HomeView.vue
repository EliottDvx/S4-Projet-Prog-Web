<script setup>
import FavTracks from '@/components/FavTracks.vue';
import FavArtists from '@/components/FavArtists.vue';

import { ref } from 'vue';

const selectedTimeRange = ref('medium_term');

</script>

<template>
  <main>
    <h1>Your Profile Main Board</h1>
    <p>Here you can see your favorite tracks and artists from different time ranges.</p>
    <div class="selectContainer">
      <select v-model="selectedTimeRange" size="3">
        <option value="short_term">Short term (4 weeks)</option>
        <option value="medium_term" selected="selected">Medium term (6 months)</option>
        <option value="long_term">Long term (Several years)</option>
      </select>
    </div>
    <FavTracks :range="selectedTimeRange" />
    <FavArtists :range="selectedTimeRange" />
  </main>
</template>

<style scoped>
.selectContainer {
  display: flex;
  justify-content: center;
  width: 100%;
}

select {
  appearance: none;
  overflow-y: auto;
  text-align: center;
  background-color: white;
  border: none;
  border-radius: 5px;
  width: 100%;
  outline: none
}

select option {
  padding: 1em;
}

select option:checked {
  background-color: #aaa;
}

@media (min-width: 1024px) {
  select {
    width: 30%;
  }
}
</style>