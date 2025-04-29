<template>
    <div class="auth-form-container">
        <div class="common-title-block">
            <h4 class="common-logo">毛日記｜DearFur</h4>
            <h2 class="common-title">重設密碼</h2>
        </div>

        <VerificationCodeInput v-model="confirmCode" :class="{ 'input-error': isConfirmCodeInvalid }" />

        <div class="mb-4">
            <label for="password" class="form-label form-label-password">
                新密碼
            </label>
            <PasswordInput v-model="password" placeholder="請輸入密碼" @focus="passwordTouched = true" id="password"
                :class="{ 'input-error': isPasswordInvalid }" />
        </div>

        <div v-if="passwordTouched" class="mb-4">
            <PasswordChecklist v-model="password" :triedSubmit="triedSubmit" v-model:passwordValid="isPasswordValid" />
        </div>

        <div class="mb-4">
            <label for="confirm-password" class="form-label form-label-password">
                確認密碼
            </label>
            <PasswordInput v-model="confirmPassword" placeholder="再次輸入密碼" id="confirm-password" :class="{ 'input-error': isConfirmPasswordInvalid }" />
            <div v-if="isConfirmPasswordInvalid" class="input-error-message">請確認密碼輸入一致</div>
        </div>


        <Button :label="'送出'" :clickAction="confirmForgotPassword" btnType="primary" :fullWidth="true" />

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
import PasswordInput from '@/components/PasswordInput.vue'
import PasswordChecklist from '@/components/PasswordChecklist.vue'
import usePasswordValidation from '@/composables/usePasswordValidation.js'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const confirmCode = ref(['', '', '', '', '', ''])
const errorMessage = ref('')
const route = useRoute()
const router = useRouter()

const triedSubmit = ref(false)

const isConfirmCodeInvalid = computed(() => triedSubmit.value && !isConfirmCodeValid.value)
const isConfirmCodeValid = computed(() => {
    return confirmCode.value.join('').length === 6
})

const {
    passwordTouched,
    isPasswordValid,
    isPasswordMatch,
    isPasswordInvalid,
    isConfirmPasswordInvalid,
} = usePasswordValidation(password, confirmPassword, triedSubmit)


onMounted(() => {

    email.value = route.query.email

    if (!email.value) {
        router.push('/login')
        return
    }
})

const confirmForgotPassword = async () => {
    try {
        triedSubmit.value = true

        if (password.value.trim() === '') {
            passwordTouched.value = true
        }

        if (
            email.value.trim() === '' ||
            password.value.trim() === '' || 
            !isPasswordMatch.value ||
            !isPasswordValid.value ||
            !isConfirmCodeValid.value
        ) {
            return
        }

        const res = await authApi.confirmForgotPassword({ email: email.value, password: password.value, confirmCode: confirmCode.value.join('') })
        errorMessage.value = ''
        router.push('/login')
    } catch (error) {
        errorMessage.value = '密碼設定失敗，請確認驗證碼是否正確。'
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