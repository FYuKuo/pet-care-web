<template>
    <div class="auth-form-container">
        <div class="common-title-block">
            <h4 class="common-logo">毛日記｜DearFur</h4>
            <h2 class="common-title">登入帳號</h2>
        </div>

        <div class="mb-4">
            <label for="email" class="form-label">Email</label>
            <input type="text" id="email" v-model="email" class="form-control" placeholder="請輸入email" />
        </div>

        <div class="mb-4">
            <label for="password" class="form-label form-label-password">
                密碼 <span @click="router.push('/forgot-password')">忘記密碼？</span>
            </label>
            <PasswordInput v-model="password" placeholder="請輸入密碼" id="password" />
        </div>

        <Button :label="'登入'" :clickAction="login" btnType="primary" :fullWidth="true" />

        <div v-if="errorMessage" class="mt-3 alert alert-danger">
            <span>{{ errorMessage }}</span>
        </div>

        <div class="mt-4 text-center sign-up-block">
            尚未擁有帳號？ <span @click="router.push('/sign-up')">註冊帳號</span>
        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import authApi from '@/apis/Auth.js'
import Button from '@/components/Button.vue'
import { useAuthStore } from '@/stores/auth.js'
import PasswordInput from '@/components/PasswordInput.vue'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()
const authStore = useAuthStore()

const login = async () => {
    try {
        const res = await authApi.login({ email: email.value, password: password.value })
        await authStore.checkAuth()
        errorMessage.value = ''
        router.push('/')
    } catch (error) {
        const errorStatus = error.status
        const errorData = error.response.data

        if (errorData.error === 'USER NOT CONFIRMED') {
            router.push({
                path: '/confirm-sign-up',
                query: { email: email.value }
            })
            return
        }

        if (errorStatus === 429) {
            errorMessage.value = '錯誤次數過多，請稍後再試'
            return
        } 
        
        errorMessage.value = '登入失敗，請檢查帳號密碼'
    }
}
</script>

<style scoped>
.auth-form-container {
    width: 50%;
}

.common-title-block {
    height: 100px;
}

.common-logo {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Zen Maru Gothic", serif;
    font-weight: 500;
}

.common-title {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    letter-spacing: 25px;
    padding-left: 25px;
}

label {
    display: block;
}

.form-label-password span {
    float: right;
    cursor: pointer;
    text-decoration: underline;
}

.form-label-password span:hover,
.sign-up-block span:hover {
    color: #0b57d0;
}

.sign-up-block span {
    cursor: pointer;
    text-decoration: underline;
}

@media (max-width: 1010px) {
    .auth-form-container {
        width: 70%;
    }
}
</style>