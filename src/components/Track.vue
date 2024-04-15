<script setup>
const props = defineProps({
    title: String,
    artist: String,
    album: String,
    image: String,
    date: String
})
const dateYear = new Date(props.date).getFullYear();
</script>


<template>
    <li>
        <img :src="image" alt="Album cover" />
        <div class="infos">
            <h3>{{ title }}</h3>
            <p>{{ artist }} - {{ album }}</p>
            <p>{{ dateYear }}</p>
        </div>
    </li>
</template>

<style scoped>
li {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    gap: 1rem;
    width: 100%;
}

img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 5px;
}

.infos {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

@media (min-width: 1024px) {
    li {
        width: 40%;
    }

    img {
        width: 200px;
        height: 200px;
    }

    .play-overlay {
        width: 200px;
        height: 200px;
    }
}
</style>