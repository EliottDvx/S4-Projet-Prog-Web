<script setup>
import { cookieValueOrNull } from '@/utils/cookieCheck';
const token = cookieValueOrNull('accessToken');

import { ref } from 'vue';
const user = ref(null);
fetch('https://api.spotify.com/v1/me', {
    headers: {
        'Authorization': 'Bearer ' + token
    }
})
    .then(response => response.json())
    .then(data => user.value = data);
</script>

<template>
    <header>
        <div class="user-profile">
            <a class="user-img" href="/">
                <img :src="user?.images[0]?.url" alt="User's profile picture" />
            </a>
            <span class="user-name">{{ user?.display_name }}</span>
        </div>
        <nav>
            <RouterLink to="/">Main Board</RouterLink>
            <RouterLink to="/recent">Recently Played</RouterLink>
        </nav>
    </header>
</template>

<style scoped>
header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    gap: 3rem;

}

nav a {
    color: white;
    text-decoration: none;
    transition: .4s;
}

nav a:hover {
    color: var(--green-primary);
}

.router-link-active {
    color: var(--green-primary);
}

.user-profile {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.user-img:hover {
    opacity: 0.7;
}

.user-img img {
    overflow: hidden;
    border-radius: 999px;
}
</style>