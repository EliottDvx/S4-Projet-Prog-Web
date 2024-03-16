<script setup>
import { cookieValueOrNull } from '@/utils/cookieCheck';
const token = cookieValueOrNull('accessToken');

import { onMounted, ref, toRef } from 'vue';
import { computed, watch } from 'vue';


const props = defineProps(['range']);

const selectedTimeRange = toRef(props, 'range');

console.log(selectedTimeRange.value);

const favTracks = ref(null);

async function fetchTopTrack(selectedTimeRange) {
    const topTrack = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${selectedTimeRange}`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })

    return topTrack.json()
}

onMounted(
    async () => {
        favTracks.value = await fetchTopTrack(selectedTimeRange.value);

    }
)

watch(props, async (newProps, oldProps) => {
    favTracks.value = await fetchTopTrack(selectedTimeRange.value);
});


</script>

<template>
    <span>{{ selectedTimeRange }}</span>
    <h2>Your favorite tracks</h2>
    <ul>
        <li v-for="track in favTracks?.items" :key="track.id">
            <img :src="track.album.images[0].url" :alt="track.album.name + ' album cover'" />
            <h2>{{ track.name }}</h2>
            <p>{{ track.artists[0].name }}</p>
        </li>
    </ul>
</template>