import { defineStore } from 'pinia'
import userApi from '@/apis/Users.js'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLogin: false,
    userData: null,
  }),

  actions: {
    async checkAuth() {

      const storedUserData = localStorage.getItem('userData')
      const storedIsLogin = localStorage.getItem('isLogin')

      if (storedIsLogin === 'true' && storedUserData) {
        this.isLogin = true
        this.userData = JSON.parse(storedUserData)
        return
      }

      try {
        // 呼叫 API 確認登入
        const response = await userApi.getUserData()
        this.isLogin = true
        this.userData = response

        localStorage.setItem('isLogin', 'true')
        localStorage.setItem('userData', JSON.stringify(response))
      } catch (e) {
        // console.log('checkAuth error:', e)
        this.isLogin = false
        this.userData = null

        localStorage.setItem('isLogin', 'false')
        localStorage.removeItem('userData')
      }

      // this.isChecked = true
    },

    logout() {
      this.isLogin = false
      this.userData = null
      this.userData = null
      // this.isChecked = false
      localStorage.setItem('isLogin', 'false')
      localStorage.removeItem('userData')
    }
  }
})
