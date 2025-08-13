import api from '@/services/api'

const petApi = {
  getPets: () => api.get('/pets'),

  getPetData: (petId) => api.get(`/pets/${petId}`),

  createPetData: (petData) => api.post(`/pets`, petData),

  updatePetData: (petId, petData) => api.put(`/pets/${petId}`, petData),

  deletePet: (petId) => api.delete(`/pets/${petId}`)
};

export default petApi;