<script setup>
import "@/assets/favStyle.css";

import Track from '@/components/Track.vue';

import { ref, toRef, onMounted, watch } from 'vue';

import { cookieValueOrNull } from '@/utils/cookieCheck';

const token = cookieValueOrNull('accessToken');

const recentTracks = ref(null);
const years = ref([]);
const selectedYear = ref("");
const selectedSort = ref('played-date');

onMounted(async () => {
    recentTracks.value = await (await fetch('https://api.spotify.com/v1/me/player/recently-played', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })).json();

    const yearsSet = new Set(recentTracks.value.items.map(track => track.track.album.release_date.slice(0, 4)));
    years.value = Array.from(yearsSet).sort().reverse();
})

watch(selectedSort, () => {
    if (selectedSort.value === 'played-date') {
        recentTracks.value.items.sort((a, b) => new Date(b.played_at) - new Date(a.played_at));
    } else if (selectedSort.value === 'alphabet') {
        recentTracks.value.items.sort((a, b) => a.track.name.localeCompare(b.track.name));
    } else if (selectedSort.value === 'release-date') {
        recentTracks.value.items.sort((a, b) => new Date(b.track.album.release_date) - new Date(a.track.album.release_date));
    }
})

</script>

<template>
    <h2>Your recently played tracks</h2>
    <div class="container">
        <div>
            <p>Filter by year:</p>
            <select v-model="selectedYear">
                <option value="" selected>All years</option>
                <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
            </select>
        </div>
        <div>
            <p>Sort by:</p>
            <select v-model="selectedSort">
                <option value="played-date" selected>Last played</option>
                <option value="alphabet">Alphabetical order</option>
                <option value="release-date">Release date</option>
            </select>
        </div>
    </div>
    <p v-if="!recentTracks">Loading...</p>
    <ul>
        <template v-for="(track, index) in  recentTracks?.items " :key="track.played_at">
            <Track v-if="new Date(track.track.album.release_date).getFullYear() == selectedYear || selectedYear == ''"
                :title="track.track.name" :artist="track.track.artists[0].name" :album="track.track.album.name"
                :image="track.track.album.images[1].url" :date="track.track.album.release_date" />
        </template>
    </ul>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    margin-bottom: 3rem;
}

.container p {
    margin-bottom: 1rem;
}

select {
    background-color: var(--color-background);
    color: white;
    border: 2px solid var(--green-primary);
    border-radius: 999px;
    padding: 16px 32px;
    cursor: pointer;
    width: 100%;
    outline: none;
    transition: .4s;
}

select:hover {
    background-color: var(--color-background-mute);
}

@media (min-width: 1024px) {
    .container {
        flex-direction: row;
        justify-content: flex-start;
    }
}
</style>