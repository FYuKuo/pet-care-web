<template>
  <Header :show-login-button="true" :show-guest-menu="true"/>
  <main>
    <slot />
  </main>
  <Footer />
</template>

<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

defineProps({
  layout: {
    type: String,
    default: 'default'
  }
})
</script>