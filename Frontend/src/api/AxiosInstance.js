import axios from 'axios';
import { TOKEN_STORAGE_KEY, AUTH_STORAGE_KEY } from '../store/authSlice';

const api = axios.create({
    baseURL: '', // package.json에 proxy를 설정했다면 비워두거나 '/' 사용
    timeout: 5000, // 5초 이상 응답 없으면 에러 처리
    headers: {
        'Content-Type': 'application/json',
    }
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(TOKEN_STORAGE_KEY);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 인터셉터(Interceptor) 설정: 요청 보내기 전이나 응답 받은 후 공통 처리 가능
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const requestUrl = error.config?.url || '';
        const isLoginRequest = requestUrl.includes('/api/users/login');

        // 예: 401 에러(권한 없음) 발생 시 로그인 페이지로 리다이렉트 하는 공통 로직
        if (error.response && error.response.status === 401 && !isLoginRequest) {
            localStorage.removeItem(TOKEN_STORAGE_KEY);
            localStorage.removeItem(AUTH_STORAGE_KEY);
            alert("세션이 만료되었습니다.");
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
