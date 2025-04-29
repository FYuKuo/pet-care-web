<template>
    <div class="mt-4 text-center resend-confirm-code">
        沒收到驗證信？
        <span @click="resendConfirmationCode"
            :style="{ cursor: isResendDisabled ? 'not-allowed' : 'pointer', color: isResendDisabled ? '#ccc' : '#0b57d0' }">
            重寄驗證信
        </span>
        <div v-if="isResendDisabled" class="countdown">
            ({{ countdown }} 秒後可重寄)
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import authApi from '@/apis/Auth.js'

const props = defineProps({
    email: String,
})

const isResendDisabled = ref(false)
const countdown = ref(60)
const errorMessage = ref('')
let timer = null

const resendConfirmationCode = async () => {
    try {
        const res = await authApi.resendConfirmationCode({ email: props.email })
        startCountdown()  // 開始倒數計時
    } catch (error) {
        errorMessage.value = '驗證信寄送失敗，請稍後再試'
    }
}

const startCountdown = () => {
    isResendDisabled.value = true
    countdown.value = 60
    timer = setInterval(() => {
        if (countdown.value > 0) {
            countdown.value--
        } else {
            clearInterval(timer)
            isResendDisabled.value = false
        }
    }, 1000)
}

watch(countdown, (newVal) => {
    if (newVal <= 0 && timer) {
        clearInterval(timer)
        isResendDisabled.value = false
    }
})


</script>

<style scoped>
.countdown {
    display: inline-block;
    margin-top: 10px;
    padding: 5px 10px;
    color: #E06D6D;
    font-weight: bold;
    font-size: 16px;
    transition: opacity 0.3s ease;
}

.countdown.hidden {
    opacity: 0;
}

.resend-confirm-code span {
    cursor: pointer;
    text-decoration: underline;
}

.resend-confirm-code span:hover {
    color: #0b57d0;
}
</style>