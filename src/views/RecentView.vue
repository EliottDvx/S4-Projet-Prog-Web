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
const orderBy = ref('desc');

onMounted(async () => {
    recentTracks.value = await (await fetch('https://api.spotify.com/v1/me/player/recently-played', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })).json();

    console.log(recentTracks.value.items);

    const yearsSet = new Set(recentTracks.value.items.map(track => track.track.album.release_date.slice(0, 4)));
    years.value = Array.from(yearsSet).sort().reverse();
})

watch(selectedSort, () => {
    orderBy.value = 'desc';

    if (selectedSort.value === 'played-date') {
        recentTracks.value.items.sort((a, b) => new Date(b.played_at) - new Date(a.played_at));
    } else if (selectedSort.value === 'alphabet') {
        recentTracks.value.items.sort((a, b) => a.track.name.localeCompare(b.track.name));
    } else if (selectedSort.value === 'release-date') {
        recentTracks.value.items.sort((a, b) => new Date(b.track.album.release_date) - new Date(a.track.album.release_date));
    }
})

const toggleOrder = () => {
    orderBy.value = orderBy.value === 'desc' ? 'asc' : 'desc';
    recentTracks.value.items.reverse();
}

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
            <div class="container-row">
                <select v-model="selectedSort">
                    <option value="played-date" selected>Last played</option>
                    <option value="release-date">Release date</option>
                    <option value="alphabet">Alphabetical order</option>
                </select>
                <button class="toggleArrow" @click="toggleOrder"><span :class="orderBy">↓</span></button>
            </div>
        </div>
    </div>
    <p v-if="!recentTracks">Loading...</p>
    <TransitionGroup name="list" tag="ul">
        <template v-for="(entry, index) in  recentTracks?.items " :key="entry.played_at">
            <Track v-if="new Date(entry.track.album.release_date).getFullYear() == selectedYear || selectedYear == ''"
                :title="entry.track.name" :artist="entry.track.artists[0].name" :album="entry.track.album.name"
                :image="entry.track.album.images[1].url" :date="entry.track.album.release_date" />
        </template>
    </TransitionGroup>
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

.container-row {
    display: flex;
    gap: 1rem;
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

.toggleArrow {
    background-color: var(--color-background);
    color: white;
    border: 2px solid var(--green-primary);
    border-radius: 999px;
    padding: 0 20px;
    cursor: pointer;
    outline: none;
    transition: .4s;
    font-size: 1.8rem;
}

.toggleArrow:hover {
    background-color: var(--color-background-mute);
}

.toggleArrow span {
    display: inline-block;
    transition: .4s;
}

.asc {
    transform: rotate(0);
}

.desc {
    transform: rotate(180deg);
}

.list-move,
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
}

.list-leave-active {
    position: absolute;
}

@media (min-width: 1024px) {
    .container {
        flex-direction: row;
        justify-content: flex-start;
    }
}
</style>