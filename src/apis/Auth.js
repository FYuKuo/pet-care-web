import api from '@/services/api'

const authApi = {
    login: (credentials) => api.post('/users/auth/login', credentials),

    logout: (data) => api.post('/users/auth/logout', data),

    refreshToken: (data) => api.post('/users/auth/refresh_token_auth', data),

    signup: (userInfo) => api.post('/users/auth/signup', userInfo),

    confirmUserSignup: (confirmData) => api.post('/users/auth/confirm_user_signup', confirmData),

    resendConfirmationCode: (userInfo) => api.post('/users/auth/resend_confirmation_code', userInfo),

    forgotPassword: (userInfo) => api.post('/users/auth/forgot_password', userInfo),

    confirmForgotPassword: (confirmData) => api.post('/users/auth/confirm_forgot_password', confirmData),

};

export default authApi;