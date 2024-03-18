<script setup>
const props = defineProps({
    title: String,
    artist: String,
    album: String,
    image: String
})
</script>

<template>
    <li>
        <div class="play-overlay">
            <button>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M3 22v-20l18 10-18 10z" />
                </svg>
            </button>
        </div>
        <img :src="image" alt="Album cover" />
        <div class="infos">
            <h3>{{ title }}</h3>
            <p>{{ artist }} - {{ album }}</p>
        </div>
    </li>
</template>

<style scoped>
li {
    display: flex;
    gap: 1rem;
    align-items: center;
    margin-bottom: 1rem;
}

img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 5px;
}

.infos {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.play-overlay {
    position: absolute;
    width: 100px;
    height: 100px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s;
}

li:hover .play-overlay {
    opacity: 1;
}
</style>