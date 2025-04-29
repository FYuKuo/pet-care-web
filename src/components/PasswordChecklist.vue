<template>
    <div class="password-check">
        <div :class="['check-item', lengthStatus.class]" id="check-item-length">
            <font-awesome-icon :icon="lengthStatus.icon" /> 最少8個字元
        </div>
        <div :class="['check-item', numberStatus.class]" id="check-item-number">
            <font-awesome-icon :icon="numberStatus.icon" /> 至少一個數字
        </div>
        <div :class="['check-item', lowercaseStatus.class]" id="check-item--lowercase-letter">
            <font-awesome-icon :icon="lowercaseStatus.icon" /> 至少一個小寫英文字母
        </div>
    </div>
</template>

<script setup>
import { computed, watch, ref } from 'vue'

const props = defineProps({
    modelValue: {
        type: String,
        required: true
    },
    triedSubmit: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['update:modelValue', 'update:passwordValid'])

// 驗證條件
const isLengthValid = ref(false)
const hasNumber = ref(false)
const hasLowercase = ref(false)

watch(() => props.modelValue, (password) => {
    isLengthValid.value = password.length >= 8
    hasNumber.value = /\d/.test(password)
    hasLowercase.value = /[a-z]/.test(password)
})

watch([isLengthValid, hasNumber, hasLowercase], () => {
    emit('update:passwordValid', isLengthValid.value && hasNumber.value && hasLowercase.value)
})


// 封裝提示狀態
const getCheckStatus = (validRef) => {
    return computed(() => {
        if (props.triedSubmit && !validRef.value) {
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
</script>

<style scoped>
.password-check {
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
</style>