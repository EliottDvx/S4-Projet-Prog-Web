<script setup>
import { ref, toRef, watchEffect } from 'vue';

import Track from '@/components/Track.vue';
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
        <Track v-for="track in favTracks?.items" :key="track.id" :title="track.name" :artist="track.artists[0].name"
            :album="track.album.name" :image="track.album.images[0].url" />
    </ul>
</template>

<style scoped>
ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 1rem;
    list-style: none;
    padding: 0;
}

@media (min-width: 1024px) {
    ul {
        gap: 2rem;
    }
}
</style>