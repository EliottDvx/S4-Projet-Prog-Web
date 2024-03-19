<script setup>
import { ref, toRef, watchEffect } from 'vue';

import Track from '@/components/Track.vue';
import { cookieValueOrNull } from '@/utils/cookieCheck';
const token = cookieValueOrNull('accessToken');

const props = defineProps(['range']);

const selectedTimeRange = toRef(props, 'range');

const favArtists = ref(null);
const showAll = ref(false);

watchEffect(async () => {
    favArtists.value = await (await fetch(`https://api.spotify.com/v1/me/top/artists?time_range=${selectedTimeRange.value}`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })).json();
})

const showAllToggle = () => {
    showAll.value = true;
}
</script>

<template>
    <h2>Your favorite artists</h2>
    <ul>
        <template v-for="(artist, index) in favArtists?.items" :key="artist.id">
            <li v-if="index < 6 || showAll">
                {{ artist.name }}
                <img :src="artist.images[1].url" :alt="artist.name" />
            </li>
        </template>
    </ul>
    <button @click="showAllToggle" v-if="showAll == false">Show all</button>
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