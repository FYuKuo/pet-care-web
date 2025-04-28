<template>
    <div class="login-left" v-show="!isMobile">
        <div class="login-banner">
            <img v-show="index === currentBannerIndex" v-for="(banner, index) in banners" :key="index"
                :src="banner.img" />
            <div class="login-banner-dots">
                <span v-for="(banner, index) in banners" :key="index" :class="{ active: index === currentBannerIndex }"
                    @click="setCurrentBannerIndex(index)"></span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, onUnmounted } from 'vue'

const banners = ref([
    { img: 'https://picsum.photos/id/321/200/300' },
    { img: 'https://picsum.photos/id/234/200/300' },
    { img: 'https://picsum.photos/id/124/200/300' },
])

const currentBannerIndex = ref(0)
let intervalId = null

const setCurrentBannerIndex = (index) => {
    currentBannerIndex.value = index
}

const startAutoSlide = () => {
    intervalId = setInterval(() => {
        currentBannerIndex.value = (currentBannerIndex.value + 1) % banners.value.length
    }, 5000)
}

const isMobile = ref(false)
const checkWindowSize = () => {
    isMobile.value = window.innerWidth < 1010
}

onMounted(() => {
    startAutoSlide()
    checkWindowSize()
    window.addEventListener('resize', checkWindowSize)
})

onBeforeUnmount(() => {
    clearInterval(intervalId)
})

onUnmounted(() => {
    window.removeEventListener('resize', checkWindowSize)
})
</script>

<style scoped>
.login-left {
    width: 50%;
    background-color: #EEF5F4;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-banner {
    width: 50%;
    height: 500px;
    display: flex;
    flex-direction: column;
}

.login-banner img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
}

.login-banner-dots {
    margin-top: 20px;
    height: 12px;
    display: flex;
    gap: 1.2rem;
    justify-content: center;
}

.login-banner-dots span {
    display: block;
    width: 10px;
    height: 10px;
    border: 1px solid #9a9a9a;
    border-radius: 50%;
    cursor: pointer;
}

.login-banner-dots span:hover,
.login-banner-dots span.active {
    border: 1px solid #4A4A4A;
    background-color: #4A4A4A;
}
</style>