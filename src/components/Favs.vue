<script setup>
import { ref, toRef, watchEffect } from 'vue';

import { cookieValueOrNull } from '@/utils/cookieCheck';
const token = cookieValueOrNull('accessToken');

const props = defineProps(['range']);

const selectedTimeRange = toRef(props, 'range');

const favTracks = ref(null);

watchEffect(async () => {
    favTracks.value = await (await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${selectedTimeRange.value}`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })).json();
})


</script>

<template>
    <h2>Your favorite tracks</h2>
    <ul>
        <li v-for="track in favTracks?.items" :key="track.id">
            <img :src="track.album.images[0].url" :alt="track.album.name + ' album cover'" />
            <h2>{{ track.name }}</h2>
            <p>{{ track.artists[0].name }}</p>
        </li>
    </ul>
</template>