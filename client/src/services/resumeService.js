import api from './api';

export const resumeService = {
  getResumes: () => api.get('/resumes'),
  uploadResume: (formData) => api.post('/resumes/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  deleteResume: (position) => api.delete(`/resumes/${position}`),
};