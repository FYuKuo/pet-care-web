<template>
    <div class="auth-form-container">
        <div class="common-title-block">
            <h4 class="common-logo">毛日記｜DearFur</h4>
            <h2 class="common-title">驗證信箱</h2>
        </div>

        <VerificationCodeInput v-model="confirmCode" :class="{ 'input-error': isConfirmCodeInvalid }" />

        <Button :label="'送出'" :clickAction="confirmUserSignup" btnType="primary" :fullWidth="true" />

        <div v-if="errorMessage" class="mt-3 alert alert-danger">
            <span>{{ errorMessage }}</span>
        </div>

        <ResendVerification :email="email" />
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import authApi from '@/apis/Auth.js'
import Button from '@/components/Button.vue'
import ResendVerification from '@/components/ResendVerification.vue'
import VerificationCodeInput from '@/components/VerificationCodeInput.vue'

const confirmCode = ref(['', '', '', '', '', ''])
const errorMessage = ref('')
const route = useRoute()
const router = useRouter()
const email = ref('')

const triedSubmit = ref(false)

const isConfirmCodeInvalid = computed(() => triedSubmit.value && !isConfirmCodeValid.value)
const isConfirmCodeValid = computed(() => {
    return confirmCode.value.join('').length === 6
})


onMounted(() => {

    email.value = route.query.email

    if (!email.value) {
        router.push('/login')
        return
    }
})

const confirmUserSignup = async () => {
    try {

        triedSubmit.value = true

        if (
            !isConfirmCodeValid.value
        ) {
            return
        }

        const res = await authApi.confirmUserSignup({ email: email.value, confirmCode: confirmCode.value.join('') })
        errorMessage.value = ''
        router.push('/login')
    } catch (error) {
        errorMessage.value = '驗證失敗，請重新確認驗證碼'
    }
}
</script>

<style scoped>
.auth-form-container {
    width: clamp(50%, 50vw, 70%);
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

.code-inputs {
    display: flex;
    justify-content: space-between;
}

.code-input {
    width: clamp(35px, 10vw, 50px);
    height: clamp(35px, 10vw, 50px);
    text-align: center;
    font-size: clamp(16px, 4vw, 18px);
    border: 1px solid #ccc;
    border-radius: 4px;
}

.code-input:focus {
    border-color: #0b57d0;
    outline: none;
}

.form-label-password span {
    float: right;
    cursor: pointer;
    text-decoration: underline;
}

.form-label-password span:hover {
    color: #0b57d0;
}


@media (max-width: 1010px) {
    .auth-form-container {
        width: 70%;
    }
}
</style>