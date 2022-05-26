import axios from "axios";

axios.defaults.baseURL = `http://192.168.10.167:1337/api`;

// Request interceptor
axios.interceptors.request.use(
  (config: any) => {
    let accessToken;
    accessToken = localStorage.getItem("jwt");
    // Do something before request is sent
    const Authorization = "Authorization";
    const Accept = "Accept";
    const ContentType = "Content-Type";
    if (accessToken && accessToken !== "") {
      config.headers[Authorization] = "Bearer " + accessToken;
    }
    config.headers[Accept] = "application/json";
    config.headers[ContentType] = "application/json";
    return config;
  },
  (error: any) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Response interceptor
axios.interceptors.response.use(
  (response: any) => {
    // Do something with response data
    return response;
  },
  (error: any) => {
    if (error?.response?.data?.statusCode == 401) {
      window.location.href = "Logout";
    } else {
      return Promise.reject(error);
    }
  }
);
