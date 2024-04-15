<script setup>
import "@/assets/favStyle.css";

import Track from '@/components/Track.vue';

import { ref, toRef, onMounted, watch } from 'vue';

import { cookieValueOrNull } from '@/utils/cookieCheck';

const token = cookieValueOrNull('accessToken');

const recentTracks = ref(null);
const years = ref([]);
const year = ref(2023);

onMounted(async () => {
    recentTracks.value = await (await fetch('https://api.spotify.com/v1/me/player/recently-played', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })).json();

    const yearsSet = new Set(recentTracks.value.items.map(track => track.track.album.release_date.slice(0, 4)));
    years.value = Array.from(yearsSet).sort().reverse();
})

console.log(recentTracks);
console.log(year);
</script>

<template>
    <h2>Your recently played tracks</h2>
    <select v-model="year">
        <option value="" selected>All years</option>
        <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
    </select>
    <p v-if="!recentTracks">Loading...</p>
    <ul>
        <template v-for="(track, index) in  recentTracks?.items " :key="track.played_at">
            <Track v-if="new Date(track.track.album.release_date).getFullYear() == year || year == ''"
                :title="track.track.name" :artist="track.track.artists[0].name" :album="track.track.album.name"
                :image="track.track.album.images[1].url" :date="track.track.album.release_date" />
        </template>
    </ul>
</template>