<script setup>
</script>

<template>
    <h2>Your recently played tracks</h2>
    <ul>
        <template v-for="(track, index) in recentTracks?.items" :key="track.played_at">
            <Track :title="track.track.name" :artist="track.track.artists[0].name" :album="track.track.album.name"
                :image="track.track.album.images[1].url" :date="track.played_at" />
        </template>
    </ul>
    <div class="btnContainer">
        <button class="button" @click="showAllToggle" v-if="showAll == false">Show all</button>
    </div>
</template>