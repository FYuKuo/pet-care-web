import { ref, computed } from 'vue'

export default function usePasswordValidation(password, confirmPassword, triedSubmit) {
    const passwordTouched = ref(false)
    const isPasswordValid = ref(false)

    const isPasswordMatch = computed(() => password.value === confirmPassword.value)

    const isPasswordInvalid = computed(() => {
        return triedSubmit.value && !isPasswordValid.value
    })

    const isConfirmPasswordInvalid = computed(() => {
        return triedSubmit.value && (confirmPassword.value.trim() === '' || !isPasswordMatch.value)
    })

    return {
        passwordTouched,
        isPasswordValid,
        isPasswordMatch,
        isPasswordInvalid,
        isConfirmPasswordInvalid,
    }
}
