<template>
    <header header ref="headerRef">
        <div v-if="showLoginButton" class="header-hamburger" @click="toggleMenu">
            <font-awesome-icon :icon="['fas', 'bars']" />
        </div>

        <div class="header-logo">
            <div class="header-logo-icon header-logo-item" @click="goHome">
                <img src="@/assets/fur-diary-icon-line-svg-gr-45x45.svg" alt="">
            </div>
            <div class="header-logo-text header-logo-item" @click="goHome">
                毛日記｜DearFur
            </div>
        </div>
        <div v-if="showLoginButton" class="header-navbar" :class="{ open: isMenuOpen }"
        :style="{ visibility: !isMenuOpen ? 'hidden' : 'visible'}">
            <div class="header-navbar-item" @click="scrollToSection('home')">
                Home
            </div>
            <div class="header-navbar-item" @click="scrollToSection('features')">
                Features
            </div>
            <div class="header-navbar-item" @click="scrollToSection('steps')">
                Steps
            </div>
            <div class="header-navbar-item" @click="scrollToSection('stories')">
                Stories
            </div>
            <div class="header-navbar-item" @click="scrollToSection('connect')">
                Connect
            </div>
        </div>
        <div class="header-button">
            <Button v-if="showLoginButton" :label="'登入'" :clickAction="goToLogin" btnType="primary" :fullWidth="false"
                class="header-button-signin" />
            <Button v-if="showLoginButton" :label="'註冊'" :clickAction="goToSignUp" btnType="primary-reversed"
                :fullWidth="false" class="header-button-signup" />
        </div>

        <!-- 灰色遮罩 -->
        <div v-if="isMenuOpen" class="overlay" @click="closeMenu"></div>
    </header>
</template>

<script setup>
import Button from '@/components/Button.vue'
import { useNavigation } from '@/composables/useNavigation'
import { onMounted, onUnmounted } from 'vue'
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

const isMenuOpen = ref(false)
const headerRef = ref(null)

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
}

const { goHome, goToLogin, goToSignUp } = useNavigation()

defineProps({
    showLoginButton: Boolean
})

const scrollToSection = (id) => {
    const offset = 60 // 如果你有 fixed header，就加 offset；否則設 0

    if (isMobile.value) {
        isMenuOpen.value = false
    }
    if (id === 'home') {
        // 滑到最上面
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
    }

    const target = document.getElementById(id)
    if (target) {
        const topPos = target.getBoundingClientRect().top + window.pageYOffset - offset
        window.scrollTo({ top: topPos, behavior: 'smooth' })
    }
}

const isMobile = ref(false)

const checkMobile = () => {
    isMobile.value = window.innerWidth < 1010
}

onMounted(() => {
    checkMobile()
    window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
    window.removeEventListener('resize', checkMobile)
})

const closeMenu = () => {
    isMenuOpen.value = false
}

onClickOutside(headerRef, () => {
    if (isMobile.value) closeMenu()
})

</script>

<style scoped>
header {
    width: 100%;
    height: 60px;
    background-color: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    display: flex;
    padding: 10px 30px;
    gap: 0.5rem;
    position: fixed;
    z-index: 999;
}

.header-logo {
    flex: 0.28;
    display: flex;
    min-width: 200px
}


.header-logo-item:hover {
    cursor: pointer;
}

.header-logo-icon {
    display: flex;
    justify-content: center;
    /* background-color: lightblue; */
    flex: 0.25;
}

.header-logo-text {
    display: flex;
    font-size: clamp(14px, 2.5vw, 18px);
    /* background-color: pink; */
    align-items: center;
    justify-content: center;
    height: 100%;
    width: auto;
    padding: 3px 3px;
    font-family: "Zen Maru Gothic", serif;
    font-weight: 500;
    font-style: normal;
}

.header-navbar {
    /* background-color: lightsalmon; */
    display: flex;
    flex: 2;
    gap: 4rem;
    justify-content: flex-end;
    padding: 2px 30px;
    text-align: center;
}

.header-navbar-item {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-weight: 500;
}

.header-button {
    /* background-color: rgb(183, 183, 253); */
    flex: 0.26;
    display: flex;
    justify-content: space-evenly;
    min-width: 170px;
}

.header-hamburger {
    display: none;
    font-size: 24px;
    background: none;
    border: none;
    cursor: pointer;
}

/* 灰色遮罩樣式 */
.overlay {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.315);
    z-index: 997;
}

@media (max-width: 1010px) {
    header {
        padding: 10px 15px;
        gap: 0;
    }

    .header-logo {
        justify-content: center;
        min-width: 180px;
    }

    .header-logo-icon {
        flex: none;
        width: 60px;
    }

    .header-logo-text {
        flex: none;
        width: auto;
    }

    .header-hamburger {
        display: flex;
        justify-content: left;
        align-items: center;
        flex: 1;
    }

    .header-navbar {
        flex-direction: column;
        background-color: rgb(246, 246, 246);
        position: fixed;
        top: 60px;
        left: 0;
        right: 0;
        z-index: 998;
        gap: 0rem;
        padding: 0;
        transform: translateY(-100%); /* 初始狀態隱藏在上方 */
        transition: transform 0.3s ease-out; /* 添加過渡動畫 */
    }

    .header-navbar.open {
        transform: translateY(0); /* 菜單打開時恢復正常位置 */
    }

    .header-navbar-item {
        font-size: 16px;
        padding: 22px 15px;
    }

    .header-navbar-item:hover {
        background-color: rgb(222, 222, 222);
    }

    .header-navbar-item:not(:last-child) {
        border-bottom: 1px solid black;
    }

    .header-button {
        text-align: center;
        flex: 1;
        justify-content: right;
        min-width: 64px;
    }

    .header-button-signup {
        display: none;
    }
}
</style>
