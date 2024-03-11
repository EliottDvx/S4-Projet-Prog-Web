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
            <img :src="user?.images[0]?.url" alt="User's profile picture" />
            <span>{{ user?.display_name }}</span>
        </div>
        <nav>
            <RouterLink to="/">Home</RouterLink>
        </nav>
    </header>
</template>

<style scoped>

.user-profile {
    display: flex;
    align-items: center;
    gap: 1rem;
}

</style>