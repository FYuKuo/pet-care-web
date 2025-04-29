<template>
    <div class="auth-form-container">
        <div class="common-title-block">
            <h4 class="common-logo">毛日記｜DearFur</h4>
            <h2 class="common-title">忘記密碼</h2>
        </div>

        <div class="mb-4">
            <label for="email" class="form-label">Email</label>
            <input type="text" id="email" v-model="email" class="form-control" :class="{ 'input-error': isEmailInvalid }" placeholder="請輸入email" />
            <div v-if="isEmailInvalid" class="input-error-message">請輸入有效的 Email 格式</div>
        </div>


        <Button :label="'送出'" :clickAction="forgotPassword" btnType="primary" :fullWidth="true" />

        <div class="mt-4 text-center sign-up-block">
            尚未擁有帳號？ <span @click="router.push('/sign-up')">註冊帳號</span>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import authApi from '@/apis/Auth.js'
import Button from '@/components/Button.vue'

const email = ref('')
const errorMessage = ref('')
const router = useRouter()

const triedSubmit = ref(false)

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const isEmailInvalid = computed(() => triedSubmit.value && (email.value.trim() === '' || !isEmailValid.value))

const isEmailValid = computed(() => {
    return emailRegex.test(email.value)
})


const forgotPassword = async () => {
    try {
        triedSubmit.value = true

        if (
            email.value.trim() === '' ||
            !isEmailValid.value
        ) {
            return
        }

        const res = await authApi.forgotPassword({ email: email.value })

        errorMessage.value = ''
        router.push({
            path: '/confirm-forgot-password',
            query: { email: email.value }
        })
    } catch (error) {
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

.form-label-password span:hover, .sign-up-block span:hover {
    color: #0b57d0;
}

.sign-up-block span {
    cursor: pointer;
    text-decoration: underline;
}

.input-error {
    border: 2px solid #bb3c3c;
}

.input-error-message {
    margin: 5px 0;
    color: #E06D6D;
}

@media (max-width: 1010px) {
    .auth-form-container {
        width: 70%;
    }
}
</style>