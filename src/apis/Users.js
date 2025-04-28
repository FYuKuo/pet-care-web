import api from '@/services/api'

const userApi = {
  getUserData: () => api.get('/users/profile'),

  updateUserData: (userId, userData) => api.put(`/users/${userId}`, userData),

  deleteUser: (userId) => api.delete(`/users/${userId}`)
};

export default userApi;