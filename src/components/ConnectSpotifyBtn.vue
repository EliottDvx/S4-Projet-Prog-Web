<script setup>
import '@/assets/main.css'

const generateRandomString = (length) => {
    let text = "";
    const possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
};

const authRedirect = () => {
    const client_id = import.meta.env.VITE_CLIENT_ID;
    const redirect_uri = import.meta.env.VITE_REDIRECT_URI;
    const state = generateRandomString(16);
    const scope = "user-top-read+user-read-private";

    window.location.href = `https://accounts.spotify.com/authorize?response_type=token&client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}&state=${state}`;
};
</script>


<template>
    <div class="wrapper">
        <h3>Connect Spotify</h3>
        <p>Connect your Spotify account to get started.</p>
        <button class="main-btn" @click="authRedirect">Connect Spotify</button>
    </div>
</template>

<style scoped>
    .wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    h3 {
        font-size: 1.2rem;
        font-weight: 500;
        margin-bottom: 0.4rem;
        color: var(--color-heading);
    }

    p {
        font-size: 1rem;
        color: var(--color-text);
    }

    .main-btn {
        margin-top: 1rem;
        padding: 0.8rem 1.2rem;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 500;
        border: none;
        cursor: pointer;
    }
</style>