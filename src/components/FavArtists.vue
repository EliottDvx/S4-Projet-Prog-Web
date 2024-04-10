<script setup>
import "@/assets/favStyle.css";

import { ref, toRef, watchEffect } from 'vue';

import Track from '@/components/Track.vue';
import { cookieValueOrNull } from '@/utils/cookieCheck';
const token = cookieValueOrNull('accessToken');

import Artist from '@/components/Artist.vue';

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
            <Artist v-if="index < 6 || showAll" :name="artist.name" :image="artist.images[1].url" />
        </template>
    </ul>
    <div class="btnContainer">
        <button class="button" @click="showAllToggle" v-if="showAll == false">Show all</button>
    </div>
</template>