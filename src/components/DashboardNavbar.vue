<template>
    <div class="navbar-container">
        <div class="navbar-logo">
            <img src="@/assets/fur-diary-icon-svg-1000x1000.svg" alt="">
        </div>

        <div class="navbar-items-container">
            <div class="navbar-items">
                <div v-for="(navbarItem, index) in navbarItems" :key="index" class="navbar-item">
                    <div class="navbar-item-icon">
                        <font-awesome-icon :icon="navbarItem.icon" />
                    </div>
                    <div class="navbar-item-text">
                        {{ navbarItem.text }}
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import { ref } from 'vue'

const navbarItems = ref([
    { icon: ['fas', 'calendar-days'], text: 'Calendar' },
    { icon: ['fas', 'paw'], text: 'Pets' },
    { icon: ['fas', 'chart-pie'], text: 'Chart' },
    { icon: ['fas', 'newspaper'], text: 'Community' },
])
</script>


<style scoped>
.navbar-container {
    height: 100vh;
    /* width: 150px; */
    width: clamp(100px, 12%, 150px);
    background-color: #233D4D;
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.navbar-logo {
    margin-top: 20px;
    margin-bottom: 20px;
    min-width: 65px;
    min-height: 65px;
    background-color: white;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.navbar-logo img {
    width: 45px;
    height: 45px;
}

.navbar-items-container {
    width: 100%;
    height: calc(100vh - 85px);
    overflow-y: auto;
}

.navbar-items {
    width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.navbar-item {
    font-size: 18px;
    min-height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    cursor: pointer;
}

/* .navbar-item:hover {
    
} */

.navbar-item-icon {
    font-size: 24px;
}

@media (max-width: 1010px) {
  .navbar-container {
    height: 70px;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    flex-direction: row;
    justify-content: space-around;
    z-index: 100;
    padding: 0 10px;
  }

  .navbar-logo {
    display: none;
  }

  .navbar-items-container {
    height: 100%;
    overflow: hidden;
    width: 100%;
  }

  .navbar-items {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: 100%;
  }

  .navbar-item {
    min-height: auto;
    font-size: 14px;
  }

  .navbar-item-icon {
    font-size: 20px;
  }
}
</style>