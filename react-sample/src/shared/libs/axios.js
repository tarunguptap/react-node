import axios from 'axios'
let axiosInstance = axios.create({
  baseURL: 'http://localhost:4000',
  headers: { 'Content-Type': 'application/json' }
});


// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
  // Do something before request is sent
  const session = JSON.parse(localStorage.getItem("session"));
  if (session != null) {
    config.headers.authorization = session.token;
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axiosInstance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});


export default axiosInstance