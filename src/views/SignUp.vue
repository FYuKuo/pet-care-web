<template>
    <div class="sign-up-input">
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
            <PasswordInput v-model="password" placeholder="請輸入密碼" @focus="passwordTouched = true"
                :class="{ 'input-error': isPasswordInvalid }" />

        </div>

        <div v-if="passwordTouched" class="mb-4 sign-up-check">
            <div :class="['check-item', lengthStatus.class]" id="check-item-length">
                <font-awesome-icon :icon="lowercaseStatus.icon" /> 最少8個字元
            </div>
            <div :class="['check-item', numberStatus.class]" id="check-item-number">
                <font-awesome-icon :icon="numberStatus.icon" /> 至少一個數字
            </div>
            <div :class="['check-item', lowercaseStatus.class]" id="check-item--lowercase-letter">
                <font-awesome-icon :icon="lowercaseStatus.icon" /> 至少一個小寫英文字母
            </div>
        </div>

        <Button :label="'註冊'" :clickAction="signUp" btnType="primary" :fullWidth="true" />

        <div class="mt-4 text-center sign-up-login">
            已經擁有帳號了？ <span @click="router.push('/login')">登入帳號</span>
        </div>

        <div v-if="errorMessage" class="mt-3 alert alert-danger">
            <p>{{ errorMessage }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import authApi from '@/apis/Auth.js'
import Button from '@/components/Button.vue'
import PasswordInput from '@/components/PasswordInput.vue'


const name = ref('')
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()

const isLengthValid = ref(false)
const hasNumber = ref(false)
const hasLowercase = ref(false)

const triedSubmit = ref(false)

const passwordTouched = ref(false)

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const isNameInvalid = computed(() => triedSubmit.value && name.value.trim() === '')
const isEmailInvalid = computed(() => triedSubmit.value && (email.value.trim() === '' || !isEmailValid.value))
const isPasswordInvalid = computed(() => triedSubmit.value && email.value.trim() === '')

const isEmailValid = computed(() => {
    return emailRegex.test(email.value)
})

const signUp = async () => {
    try {

        triedSubmit.value = true

        if (password.value.trim() === '') {
            passwordTouched.value = true
        }

        if (name.value.trim() === '' || email.value.trim() === '' || password.value.trim() === '' || !isEmailValid.value) {
            return
        }

        if (!isLengthValid.value || !hasNumber.value || !hasLowercase) {
            return
        }

        const res = await authApi.signup({ name: name.value, email: email.value, password: password.value })
        errorMessage.value = ''
        router.push('/login')
    } catch (error) {
        errorMessage.value = '此 E-mail 已被註冊過了。'
    }
}

const checkPassword = (password) => {
    isLengthValid.value = password.length >= 8
    hasNumber.value = /\d/.test(password)
    hasLowercase.value = /[a-z]/.test(password)

}

// 封裝一個計算提示狀態的 helper（icon 和 className）
const getCheckStatus = (validRef) => {
    return computed(() => {
        if (triedSubmit.value && !validRef.value) {
            return { icon: ['fas', 'circle-xmark'], class: 'check-item-fail' }
        }
        if (validRef.value) {
            return { icon: ['fas', 'circle-check'], class: 'check-item-success' }
        }
        return { icon: ['fas', 'circle-check'], class: undefined }
    })
}

const lengthStatus = getCheckStatus(isLengthValid)
const numberStatus = getCheckStatus(hasNumber)
const lowercaseStatus = getCheckStatus(hasLowercase)

watch(password, (newPassword) => {
    checkPassword(newPassword)
})
</script>

<style scoped>
.sign-up-input {
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

.sign-up-check {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
}

.check-item {
    color: #9b9b9b;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.check-item-success {
    color: #6BBF9F;
}

.check-item-fail {
    color: #E06D6D;
}

.input-error {
    border: 2px solid #bb3c3c;
}

.input-error-message {
    margin: 5px 0;
    color: #E06D6D;
}

@media (max-width: 1010px) {
    .sign-up-input {
        width: 70%;
    }
}
</style>