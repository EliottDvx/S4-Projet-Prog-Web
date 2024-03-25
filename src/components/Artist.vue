<script setup>
const props = defineProps({
    name: String,
    image: String

})
</script>

<template>
    <li>
        <img :src="image" :alt="`${name} Profile Picture`" />
        <div class="infos">
            <h3>{{ name }}</h3>
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

.play-overlay button {
    background-color: transparent;
    border: none;
    transition: transform 0.3s;
}

li:hover .play-overlay {
    cursor: pointer;
    opacity: 1;
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