<template>
  <LoginHeader />
  <div class="login-main">
    <LoginLeft />
    <div class="login-right">
      <slot />
    </div>
  </div>
</template>

<script setup>
import LoginHeader from '@/components/LoginHeader.vue'
import LoginLeft from '@/components/LoginLeft.vue'
</script>

<style scoped>
.login-main {
  display: flex;
  min-height: 100vh;
}
.login-right {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
@media (max-width: 1010px) {
  .login-right {
    width: 100%;
  }
}
</style>
