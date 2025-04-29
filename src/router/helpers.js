import router from '@/router'

export async function refreshTo(path) {
    await router.replace('/redirect-dummy')
    await router.replace(path)
} 