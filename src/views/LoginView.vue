<script setup>
    import ConnectSpotifyBtn from '@/components/ConnectSpotifyBtn.vue';

    import { useRouter, useRoute } from 'vue-router'
    import { onMounted } from 'vue'
    import { cookieValueOrNull } from '@/utils/cookieCheck'

    const router = useRouter()
    const route = useRoute()

    onMounted(() => {
        cookieValueOrNull('accessToken')
        ? router.replace('/') : {}
    })

</script>

<template>
    <main>
        <ConnectSpotifyBtn />
    </main>
</template>