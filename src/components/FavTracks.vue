<script setup>
import "@/assets/favStyle.css";

import { ref, toRef, watchEffect } from 'vue';

import Track from '@/components/Track.vue';
import { cookieValueOrNull } from '@/utils/cookieCheck';
const token = cookieValueOrNull('accessToken');

const props = defineProps(['range']);

const selectedTimeRange = toRef(props, 'range');

const favTracks = ref(null);
const showAll = ref(false);

watchEffect(async () => {
    favTracks.value = await (await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${selectedTimeRange.value}`, {
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
    <h2>Your favorite tracks</h2>
    <ul>
        <template v-for="(track, index) in favTracks?.items" :key="track.id">
            <Track v-if="index < 6 || showAll" :title="track.name" :artist="track.artists[0].name"
                :album="track.album.name" :image="track.album.images[1].url" :date="track.album.release_date" />
        </template>
    </ul>
    <button @click="showAllToggle" v-if="showAll == false">Show all</button>
</template>