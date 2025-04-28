<template>
    <div>
        <h1>這裡是User頁面</h1>
        <div>
            <p>User ID: {{ userId }}</p>
            <p>Name: {{ name }}</p>
            <p>Email: {{ email }}</p>
            <p>Gender: {{ genderText }}</p>
            <!-- <p>Photo: {{ name }}</p> -->
        </div>

        <button type="button" class="btn btn-secondary" @click="logout">登出</button>
    </div>
</template>

<script>
import { refreshTo } from '@/router/helpers.js'

import authApi from '@/apis/Auth.js';
import Button from '@/components/Button.vue'
import { useAuthStore } from '@/stores/auth.js'


export default {
    name: "User", components: {
        Button
    },
    data() {
        return {
            userId: '',
            name: '',
            email: '',
            gender: '',
            photo: null,
            errorMessage: ''
        }
    },
    mounted() {
        if (localStorage.getItem('isLogin') === 'true') {
            this.getUserProfile();
        } else {
            this.$router.push('/')
        }
    },
    computed: {
        genderText() {
            return this.gender === 1 ? '男' : '女';
        },
        photoUrl() {
            return this.photo ? this.photo : 'https://via.placeholder.com/150';
        }
    },
    methods: {
        async getUserProfile() {
            const authStore = useAuthStore()
            try {
                
                // const userData = await userApi.getUserData()

                const userData = authStore.userData

                this.userId = userData.userId
                this.name = userData.name
                this.email = userData.email
                this.gender = userData.gender
                this.photo = userData.photo
            } catch (error) {
                localStorage.setItem('isLogin', 'false');
                this.$router.push('/')
            }
        },
        async logout() {
            const authStore = useAuthStore()
            try {
                const res = await authApi.logout()
            } catch (error) {
                console.error('登出失敗', error);
            } finally {
                // 無論如何都清除登入狀態
                authStore.logout()
                refreshTo('/')

            }
        },

    }
}
</script>

<style></style>