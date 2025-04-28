<template>
  <component :is="layout">
    <router-view :key="componentKey" />
  </component>
</template>

<script>
import loginLayout from '@/layouts/loginLayout.vue'
import defaultLayout from '@/layouts/defaultLayout.vue'
import authLayout from '@/layouts/authLayout.vue'

export default {
  computed: {
    layout() {
      const layout = this.$route.meta.layout

      switch (layout) {
        case 'login':
        case 'sign-up':
        case 'forgot-password':
        case 'confirm-sign-up':
          return loginLayout
        case 'auth':
          return authLayout
        default:
          return defaultLayout
      }
    },
    componentKey() {
      // 這裡用路由名稱 + 動態 component 標記，確保切換時會刷新 router-view
      return this.$route.name + (this.$route.meta._component ? '-dynamic' : '')
    }

  }
}
</script>
