<template>
    <header class="login-header">
        <div class="header-logo">
            <div class="header-logo-icon header-logo-item" @click="goHome">
                <img src="@/assets/fur-diary-icon-line-svg-gr-45x45.svg" alt="Logo">
            </div>
            <div class="header-logo-text header-logo-item" @click="goHome">
                毛日記｜DearFur
            </div>
        </div>
    </header>
</template>

<script setup>
import { useNavigation } from '@/composables/useNavigation'

const { goHome } = useNavigation()

</script>

<style scoped>
.login-header {
    height: 60px;
    background-color: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    display: flex;
    justify-content: flex-start;
    padding: 10px 30px;
    gap: 0.5rem;
    position: fixed;
    z-index: 999;
    width: 100%;
}

.header-logo {
    display: flex;
    justify-content: center;
}

.header-logo-item:hover {
    cursor: pointer;
}

.header-logo-icon {
    display: flex;
    justify-content: center;
    flex: 0.25;
}

.header-logo-text {
    display: flex;
    font-size: clamp(14px, 2.5vw, 18px);
    align-items: center;
    justify-content: center;
    height: 100%;
    width: auto;
    padding: 3px 3px;
    font-family: "Zen Maru Gothic", serif;
    font-weight: 500;
}

@media (max-width: 1010px) {
    .login-header {
        padding: 10px 15px;
        justify-content: center;
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
}
</style>