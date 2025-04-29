<template>
    <div class="auth-form-container">
        <div class="common-title-block">
            <h4 class="common-logo">毛日記｜DearFur</h4>
            <h2 class="common-title">註冊帳號</h2>
        </div>

        <div class="mb-4">
            <label for="name" class="form-label">名字</label>
            <input type="text" id="name" v-model="name" class="form-control" :class="{ 'input-error': isNameInvalid }"
                placeholder="請輸入名字" />
            <div v-if="isNameInvalid" class="input-error-message">請輸入名字</div>
        </div>

        <div class="mb-4">
            <label for="email" class="form-label">Email</label>
            <input type="text" id="email" v-model="email" class="form-control"
                :class="{ 'input-error': isEmailInvalid }" placeholder="請輸入email" />
            <div v-if="isEmailInvalid" class="input-error-message">請輸入有效的 Email 格式</div>
        </div>

        <div class="mb-4">
            <label for="password" class="form-label form-label-password">
                密碼
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
            <PasswordInput v-model="confirmPassword" placeholder="再次輸入密碼" id="confirm-password"
                :class="{ 'input-error': isConfirmPasswordInvalid }" />
            <div v-if="isConfirmPasswordInvalid" class="input-error-message">請確認密碼輸入一致</div>
        </div>

        <Button :label="'註冊'" :clickAction="signUp" btnType="primary" :fullWidth="true" />

        <div class="mt-4 text-center sign-up-login">
            已經擁有帳號了？ <span @click="router.push('/login')">登入帳號</span>
        </div>

        <div v-if="errorMessage" class="mt-3 alert alert-danger">
            <span>{{ errorMessage }}</span>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import authApi from '@/apis/Auth.js'
import Button from '@/components/Button.vue'
import PasswordInput from '@/components/PasswordInput.vue'
import PasswordChecklist from '@/components/PasswordChecklist.vue'
import usePasswordValidation from '@/composables/usePasswordValidation.js'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')
const router = useRouter()

const triedSubmit = ref(false)

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const isNameInvalid = computed(() => triedSubmit.value && name.value.trim() === '')
const isEmailInvalid = computed(() => triedSubmit.value && (email.value.trim() === '' || !isEmailValid.value))

const isEmailValid = computed(() => {
    return emailRegex.test(email.value)
})


const {
    passwordTouched,
    isPasswordValid,
    isPasswordMatch,
    isPasswordInvalid,
    isConfirmPasswordInvalid,
} = usePasswordValidation(password, confirmPassword, triedSubmit)

const signUp = async () => {
    try {

        triedSubmit.value = true


        if (password.value.trim() === '') {
            passwordTouched.value = true
        }

        if (
            name.value.trim() === '' ||
            email.value.trim() === '' ||
            password.value.trim() === '' ||
            !isEmailValid.value ||
            !isPasswordMatch.value ||
            !isPasswordValid.value
        ) {
            return
        }

        const res = await authApi.signup({ name: name.value, email: email.value, password: password.value })
        errorMessage.value = ''
        router.push({
            path: '/confirm-sign-up',
            query: { email: email.value }
        })
    } catch (error) {
        errorMessage.value = '此 E-mail 已被註冊過了。'
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

.sign-up-login span {
    cursor: pointer;
    text-decoration: underline;
}

.sign-up-login span:hover {
    color: #0b57d0;
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