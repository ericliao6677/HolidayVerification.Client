import { holidayInstance } from '../utils/holidayVerificationInstance.js';

export const holidayService = {
  get: (queryString = '') => holidayInstance.get(`/api/Holiday/Get?${queryString}`),
  getByDate: (queryString) => holidayInstance.get(`/api/Holiday/GetByDate/${queryString}`),
  insert: (payload) => holidayInstance.post('/api/Holiday/Insert', payload),
  update: (payload) => holidayInstance.put('/api/Holiday/Put', payload),
  delete: (id) => holidayInstance.delete(`/api/Holiday/Delete/${id}`),
  uploadFile: (binaryData) => holidayInstance.post('api/Holiday/InsertDataFromCsvFile', binaryData)
};
