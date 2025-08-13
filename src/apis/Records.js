import api from '@/services/api'

const recordApi = {
  getRecords: (startTime, endTime) => api.get(`/records?start_time=${startTime}&end_time=${endTime}`),

  getRecordData: (recordId) => api.get(`/records/${recordId}`),

  createRecordData: (recordData) => api.post(`/records`, recordData),

  updateRecordData: (recordId, recordData) => api.put(`/records/${recordId}`, recordData),

  deleteRecord: (recordId) => api.delete(`/records/${recordId}`)
};

export default recordApi;