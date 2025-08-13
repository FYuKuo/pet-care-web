import api from '@/services/api'

const recordApi = {
  getRecords: (startTime, endTime) => api.get(`/records?start_time=${startTime}&end_time=${endTime}`),

  getRecordData: (timestamp) => api.get(`/records/${timestamp}`),

  createRecordData: (recordData) => api.post(`/records`, recordData),

  updateRecordData: (timestamp, recordData) => api.put(`/records/${timestamp}`, recordData),

  deleteRecord: (timestamp) => api.delete(`/records/${timestamp}`)
};

export default recordApi;