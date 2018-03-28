import axios from 'axios'

export const storage = {
  getToken() {
    return localStorage.token;
  },
  setToken(token) {
    localStorage.token = token;
  },
  checkToken: (to, from, next) => {
    if(!storage.getToken())
    {
      const backurl = location.pathname + location.search;
      next('/?backurl=' + backurl);
    }
    else
      next();
  }
};

const configure = axios => {
  axios.defaults.baseURL = '/api';

  axios.interceptors.request.use(config => {
    config.headers.authorization = storage.getToken();
    return config
  });

  axios.interceptors.response.use(
    response => {
      const { authorization } = response.headers;
      if (authorization) {
        storage.setToken(authorization);
      }
      return response
    },
    error => {
      if (error.response.status === 401) {
        return new Promise((resolve, reject) => {
          storage.setToken('');
          return reject(error.response.data)
        })
      }
      return new Promise((resolve, reject) => reject(error.response.data))
    }
  );
  return axios
};

export default configure(axios)
