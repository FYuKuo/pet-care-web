<template>
  <LoginHeader />
  <div class="auth-main">
    <AuthLeft />
    <div class="auth-right">
      <slot />
    </div>
  </div>
</template>

<script setup>
import LoginHeader from '@/components/LoginHeader.vue'
import AuthLeft from '@/components/AuthLeft.vue'
</script>

<style scoped>
.auth-main {
  display: flex;
  min-height: 100vh;
  width: 100%;
}
.auth-right {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
@media (max-width: 1010px) {
  .auth-right {
    width: 100%;
  }
}
</style>
