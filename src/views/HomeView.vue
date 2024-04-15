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
        <option value="medium_term" selected>Medium term (6 months)</option>
        <option value="long_term">Long term (Several years)</option>
      </select>
    </div>
    <FavTracks :range="selectedTimeRange" />
    <FavArtists :range="selectedTimeRange" />
  </main>
</template>

<style scoped>
@import '@/assets/base.css';

.selectContainer {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 3rem;
  margin-top: 3rem;
}

select {
  appearance: none;
  overflow-y: auto;
  text-align: center;
  background-color: var(--color-background);
  color: white;
  border: 2px solid white;
  border-radius: 25px;
  width: 100%;
  outline: none;
  transition: .4s;
}

select option {
  padding: 1em;
  transition: .4s;
}

select option:hover {
  background-color: var(--color-background-mute);
}

select option:checked {
  background-color: var(--green-primary);
}

select option:focus {
  background-color: var(--green-primary);
}

@media (min-width: 1024px) {
  select {
    width: 30%;
  }
}
</style>