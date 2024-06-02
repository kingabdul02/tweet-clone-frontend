// // axiosInterceptor.ts
// import axios from 'axios';
// import store from '../redux/store';
// import { selectLoggedInUser } from '../redux/reducers/authSlice';

// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:3000/api',
// });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const loggedInUser = selectLoggedInUser(store.getState());
//     const token = loggedInUser?.access_token;

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => Promise.reject(error)
// );

// export default axiosInstance;
