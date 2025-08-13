<template>

    <div class="dashboard-main">
        <DashboardNavbar />
        <div class="dashboard-container">
            <DashboardHeader class="desktop-only"/>
            <div class="dashboard-content">
                <slot />
            </div>
        </div>

    </div>

</template>

<script setup>

import DashboardNavbar from '@/components/DashboardNavbar.vue'
import DashboardHeader from '@/components/DashboardHeader.vue'
</script>


<style scoped>
.dashboard-main {
    display: flex;
    
}

.dashboard-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100svh;
    margin-left: clamp(100px, 12%, 150px);
}

.dashboard-content {
    margin-top: 80px;
    height: calc(100svh - 80px);
    display: flex;
    justify-content: center;
    align-items: flex-start;
}

@media (max-width: 1010px) {
  .dashboard-main {
    flex-direction: column;
    overflow: hidden;
    touch-action: none;
  }

  .dashboard-container {
    margin-left: 0;
    /* height: auto; */
    overflow: hidden;
    touch-action: none;
  }

  .dashboard-content {
    margin-top: 0;
    /* height: auto; */
    overflow: hidden;
    touch-action: none;
  }

  .desktop-only {
    display: none;
  }
}
</style>