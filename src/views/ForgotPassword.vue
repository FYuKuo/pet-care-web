<template>
    <div class="login-input">
        <div class="common-title-block">
            <h4 class="common-logo">毛日記｜DearFur</h4>
            <h2 class="common-title">忘記密碼</h2>
        </div>

        <div class="mb-4">
            <label for="email" class="form-label">Email</label>
            <input type="text" id="email" v-model="email" class="form-control" placeholder="請輸入email" />
        </div>


        <Button :label="'送出'" :clickAction="forgotPassword" btnType="primary" :fullWidth="true" />

        <div class="mt-4 text-center login-sign-up">
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

const email = ref('')
const errorMessage = ref('')
const router = useRouter()
const authStore = useAuthStore()

const forgotPassword = async () => {
    try {
        const res = await authApi.forgotPassword({ email: email.value, password: password.value })
        await authStore.checkAuth()
        errorMessage.value = ''
        router.push('/')
    } catch (error) {
        errorMessage.value = '登入失敗，請檢查帳號密碼'
    }
}
</script>

<style scoped>
.login-input {
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

.form-label-password span:hover, .login-sign-up span:hover {
    color: #0b57d0;
}

.login-sign-up span {
    cursor: pointer;
    text-decoration: underline;
}

@media (max-width: 1010px) {
    .login-input {
        width: 70%;
    }
}
</style>