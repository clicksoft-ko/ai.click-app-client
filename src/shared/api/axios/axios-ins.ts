import { getToken, removeToken, setToken } from "@/shared/utils/cookies/token";
import axios from "axios";
import { fetchRefreshToken } from "./refresh-token";
import { envUtil } from "@/shared/utils/env";

export const axiosAuth = axios.create({
  baseURL: envUtil.BACKEND_URL, headers: {
    'Content-Type': 'application/json',
  },
});

axiosAuth.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
})

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

axiosAuth.interceptors.response.use(response => {
  return response;
}, async error => {
  const originalRequest = error.config;

  if (error.response.status === 401 && !originalRequest._retry) {
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then(token => {
        return axiosResponseWithAuth(originalRequest, token as string);
      }).catch(err => {
        return Promise.reject(err);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const accessToken = getToken();
      if (!accessToken) {
        throw error;
      }
      const newAccessToken = await fetchRefreshToken(accessToken);
      setToken(newAccessToken);
      processQueue(null, newAccessToken);
      return axiosResponseWithAuth(originalRequest, newAccessToken);
    } catch (err) {
      processQueue(err, null);
      removeToken();
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }

  return Promise.reject(error);
});

const axiosResponseWithAuth = (originalRequest: any, token: string) => {
  originalRequest.headers['Authorization'] = 'Bearer ' + token;
  return axiosAuth(originalRequest);
}