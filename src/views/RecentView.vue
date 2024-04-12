<script setup>
import "@/assets/favStyle.css";

import Track from '@/components/Track.vue';

import { ref, toRef, watchEffect } from 'vue';

import { cookieValueOrNull } from '@/utils/cookieCheck';

const token = cookieValueOrNull('accessToken');

const recentTracks = ref(null);

watchEffect(async () => {
    recentTracks.value = await (await fetch('https://api.spotify.com/v1/me/player/recently-played', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })).json();
})
</script>

<template>
    <h2>Your recently played tracks</h2>
    <ul>
        <template v-for="(track, index) in recentTracks?.items" :key="track.played_at">
            <Track :title="track.track.name" :artist="track.track.artists[0].name" :album="track.track.album.name"
                :image="track.track.album.images[1].url" :date="track.track.album.release_date" />
        </template>
    </ul>
</template>