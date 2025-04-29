import { useRouter } from 'vue-router'

export function useNavigation() {
    const router = useRouter()

    function goHome() {
        router.push('/')
    }

    function goToLogin() {
        router.push('/login')
    }
    function goToUser() {
        router.push('/user')
    }
    function goToSignUp() {
        router.push('/sign-up')
    }

    return {
        goHome,
        goToLogin,
        goToUser,
        goToSignUp
    }
}
