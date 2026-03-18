import api from './AxiosInstance';

export const userApi = {
    // 회원가입
    signUp: (formData) => api.post('/api/users/signup', formData),
    
    // 아이디 중복 체크
    checkId: (userId) => api.get(`/api/users/check-id/${userId}`),
    
    // 로그인
    login: (credentials) => api.post('/api/users/login', credentials),
};